// eslint-disable-next-line import/no-extraneous-dependencies
import { CloudFormation, S3, StepFunctions, CloudWatchLogs } from "aws-sdk";

const cf = new CloudFormation({ apiVersion: "2010-05-15" });
const s3 = new S3({ apiVersion: "2006-03-01" });
const stepFunctions = new StepFunctions({ apiVersion: "2016-11-23" });
const cwl = new CloudWatchLogs({ apiVersion: "2014-03-28" });

/**
 * Purge all objects from an S3 bucket
 */
const purgeS3Bucket = async (bucketName: string) => {
  let hasVersioning: boolean;

  try {
    const versioningConfiguration = await s3
      .getBucketVersioning({ Bucket: bucketName })
      .promise();

    hasVersioning = versioningConfiguration.Status === "Enabled";
  } catch (err) {
    console.warn(
      `Skipping Bucket: ${bucketName}, Reason: Unable to get versioning configuration`
    );
    return;
  }

  // List all objects in the bucket
  let nextToken: string | undefined;
  let hasMoreObjects = true;
  do {
    const objectsToDelete: Array<{ Key: string; VersionId?: string }> = [];

    if (hasVersioning) {
      const versionedResponse = await s3
        .listObjectVersions({ Bucket: bucketName })
        .promise();

      nextToken = versionedResponse.NextVersionIdMarker;
      hasMoreObjects = Boolean(versionedResponse.IsTruncated);

      versionedResponse.Versions?.forEach((version) => {
        if (version.Key)
          objectsToDelete.push({
            Key: version.Key,
            VersionId: version.VersionId,
          });
      });
    } else {
      const listObjectsResponse = await s3
        .listObjectsV2({
          Bucket: bucketName,
          ContinuationToken: nextToken,
        })
        .promise();

      hasMoreObjects = Boolean(listObjectsResponse.IsTruncated);

      listObjectsResponse.Contents?.forEach((object) => {
        if (object.Key)
          objectsToDelete.push({
            Key: object.Key,
          });
      });
    }

    // Delete the objects
    if (objectsToDelete?.length) {
      const deleteObjectsParameters: S3.Types.DeleteObjectsRequest = {
        Bucket: bucketName,
        Delete: {
          Objects: objectsToDelete,
        },
      };
      await s3.deleteObjects(deleteObjectsParameters).promise();
    }
  } while (hasMoreObjects);
};

const stopAllExecutions = async (stateMachineArn: string) => {
  // List all executions of the state machine
  let response: StepFunctions.ListExecutionsOutput | undefined;
  do {
    const listExecutionsResponse = await stepFunctions
      .listExecutions({
        maxResults: 100,
        nextToken: response?.nextToken,
        stateMachineArn,
        statusFilter: "RUNNING",
      })
      .promise();
    response = listExecutionsResponse;

    // Stop the executions
    if (response.executions?.length) {
      for (const execution of response.executions) {
        await stepFunctions
          .stopExecution({
            executionArn: execution.executionArn,
          })
          .promise();
      }
    }
  } while (response?.nextToken);
};

const deleteLogGroup = async (logGroupName: string) => {
  return cwl
    .deleteLogGroup({ logGroupName })
    .promise()
    .catch((error) => {
      if (error.code !== "ResourceNotFoundException") {
        console.warn("Failed to delete log group: " + logGroupName, { error });
      }
    });
};

export const handler = async (
  _event: unknown,
  _context: unknown,
  callback: (error: unknown, response: Record<string, unknown>) => void
) => {
  const { STACK_NAME, S3_BUCKETS, STATE_MACHINES, LOG_GROUPS } = process.env;

  const s3Buckets = S3_BUCKETS?.split(";") || [];
  const stateMachines = STATE_MACHINES?.split(";") || [];
  const logGroups = LOG_GROUPS?.split(";").filter(Boolean) || [];

  const promises: Array<Promise<unknown>> = [];

  for (const bucketName of s3Buckets) {
    if (bucketName) {
      console.log("Purging S3 bucket: " + bucketName);
      promises.push(purgeS3Bucket(bucketName));
    }
  }

  for (const stateMachineArn of stateMachines) {
    if (stateMachineArn) {
      console.log("Stopping Statemachine executions of: " + stateMachineArn);
      promises.push(stopAllExecutions(stateMachineArn));
    }
  }

  for (const logGroup of logGroups) {
    if (logGroups) {
      console.log("Deleting log group: " + logGroup);
      promises.push(deleteLogGroup(logGroup));
    }
  }

  if (STACK_NAME === undefined) {
    throw new Error("STACK_NAME is not defined");
  }

  if (promises.length) {
    console.log("Waiting for all promises to resolve...");
    await Promise.all(promises);
    console.log("All promises resolved");
  }

  const timestamp = new Date().toISOString();

  await cf.deleteStack({ StackName: STACK_NAME }).promise();

  const message = `Started self destruct at ${timestamp}`;

  console.log(message);

  callback(null, {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, stack: STACK_NAME, timestamp }, null, 2),
    isBase64Encoded: false,
  });
};

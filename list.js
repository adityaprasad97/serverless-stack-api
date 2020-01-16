/* eslint-disable require-jsdoc */
import * as dynamodbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' key condition required
    // 'ExpressionAttributeValues' defines the value in the condition
    // ':userId' defines 'userId' to be Identity Pool identity id of
    // the authenticated user
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result = await dynamodbLib.call('query', params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    return failure({status: false});
  }
}

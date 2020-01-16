/* eslint-disable require-jsdoc */
import * as dynamodbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sorted
    //  key of the item to be updated
    // 'userId': Identity Pool identity od of the
    // authentiated user
    // 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },

    // 'UpdateExpression' definest the attributes to be updated
    // eslint-disable-next-line no-multi-str
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    // eslint-disable-next-line max-len
    // 'ExpressionAttributeValues' defines the values in the udpate expression
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update;
    // inspect 'result' below to see how it works with different settings
    ReturnValues: 'ALL_NEW',
  };

  try {
    await dynamodbLib.call('update', params);
    return success({status: true});
  } catch (e) {
    return failure({status: false});
  }
}

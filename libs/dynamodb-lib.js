import AWS from 'aws-sdk';

// eslint-disable-next-line require-jsdoc
export function call(action, params) {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  return dynamodb[action](params).promise();
}

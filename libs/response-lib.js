// eslint-disable-next-line require-jsdoc
export function success(body) {
  return buildResponse(200, body);
}

// eslint-disable-next-line require-jsdoc
export function failure(body) {
  return buildResponse(200, body);
}

// eslint-disable-next-line require-jsdoc
function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}

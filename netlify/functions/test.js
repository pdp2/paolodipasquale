
const handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    },
    body: 'Hello World! ' + process.env.TEST_PAOLO,
  };
};

module.exports = { handler };
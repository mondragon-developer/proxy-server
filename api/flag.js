const axios = require('axios');

// Serverless function that  handles one incoming request and sends one response back.
module.exports = async (req, res) => {
  try {
    // Target APi
    const awsUrl = 'https://wgg522pwivhvi5gqsn675gth3q0wweas.lambda-url.us-east-1.on.aws/6f7665';

    // Make the POST request from the server
    const response = await axios.post(
      awsUrl,
      "Ramp", // The request body
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    // CORS headers to allow your app to access this
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows any domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Send the data from AWS to the response
    res.status(200).send(response.data);

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching from the target API',
      details: error.message,
    });
  }
};
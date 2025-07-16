const axios = require('axios');

// Serverless function that  handles one incoming request and sends one response back.
module.exports = async (req, res) => {
  // Ensures the browser gets permission regardless of what happens next.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const awsUrl = 'https://wgg522pwivhvi5gqsn675gth3q0wweas.lambda-url.us-east-1.on.aws/6f7665';

    const response = await axios.post(
      awsUrl,
      "Ramp", // The request body
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    // Send the data from AWS back as the response
    return res.status(200).send(response.data);

  } catch (error) {
    // If something goes wrong, the CORS headers are still sent correctly.
    return res.status(500).json({
      message: 'Error fetching from the target API',
      details: error.message,
    });
  }
};
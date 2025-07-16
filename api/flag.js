const axios = require('axios');

// Serverless function that  handles one incoming request and sends one response back.
module.exports = async (req, res) => {
  // CORS headers to allow cross-origin requests
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
      "Ramp",
      {
        headers: { 'Content-Type': 'application/json',
        // Bypassing the AWS server's "bot" detection.
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
         },
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
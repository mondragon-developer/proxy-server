const axios = require('axios');

// This function handles one incoming request and sends one response back.
module.exports = async (req, res) => {
  // --- Set CORS headers for ALL responses ---
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows any domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // --- Handle the browser's preflight OPTIONS request ---
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // THE FIX: Use the new URL that works with a GET request
    const awsUrl = 'https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/6f7665';

    // THE FIX: Change the request to a simple GET, with no body.
    const response = await axios.get(awsUrl, {
      headers: {
        // We keep the User-Agent to make our request look like it's from a browser.
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

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
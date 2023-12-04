// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

// Create an Express application
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----------------------------------------------
// Route to get general purpose information
// URI: http://localhost:3000/twsi
app.get('/twsi', (req, res) => {
  res.json({
    company_name: 'Boeing',
    address: 'Boeing Frederickson Fab Division',
    email: 'Boeingt123@email.com',
    telephone: '123-456-7890',
  });
});

// ----------------------------------------------
// Route to get version information for Computer Vision
// URI: http://localhost:3000/twsi/cv
app.get('/twsi/cv', (req, res) => {
  res.json({ version: 'TWSI Computer Vision 1.0' });
});

// ----------------------------------------------
// Route to get information about image detection
// URI: http://localhost:3000/twsi/cv/detect
app.get('/twsi/cv/detect', (req, res) => {
  res.json({ message: 'TWSI Image Detection' });
});

// // ----------------------------------------------
// // Route to process an image at a given URL
// // URI: http://localhost:3000/twsi/cv/detect/url
// app.post('/twsi/cv/detect/url', async (req, res) => {
//   const imageUrl = req.body.url; // Correct variable name
//   try {
//     console.log('Request Body:', req.body);
//     console.log('Request Headers:', req.headers);

//     const azureApiKey = '8fc3e5588bd84720a9142ba5f1eda4a4'; 
//     const azureApiUrl = 'https://westus.api.cognitive.microsoft.com/vision/v3.2/analyze'; 

//     const response = await axios.post(
//       azureApiUrl,
//       { url: imageUrl }, // Correct variable name
//       { 
//         headers: {
//           'Content-Type': 'application/json',
//           'Ocp-Apim-Subscription-Key': azureApiKey,
//         },
//         params: {
//           language: 'en',
//           modelVersion: 'latest',
//           visualFeatures: 'Categories,Color,description,Faces,Objects,Tags'
//         },
//       }
//     );

//     // Return the results from Azure's API
//     res.json({ url: imageUrl, azureApiResponse: response.data }); // Correct variable name
//   } catch (error) {
//     console.error('Error calling Azure API:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.post('/twsi/cv/detect/url', async (request, response) => {
  console.log('Request Body:', request.body);
  console.log('Request Headers:', request.headers);
  let visualFeatures = request.body.visualFeatures;
  let details = request.body.details;
  let language = request.body.language;
  let imageUrl = request.header('url');
  if (imageUrl == null) {
    return response.status(400).json({Error: "URL header is required."});
  }
  const key = '8fc3e5588bd84720a9142ba5f1eda4a4'
  const endpoint = 'https://westus.api.cognitive.microsoft.com/vision/v3.2/analyze?';
  const postResponse = await axios.post(endpoint, {
    url: imageUrl
  }, {
    params: {
      visualFeatures: visualFeatures,
      details: details,
      language: language
    },
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/json'
    }
  }).catch(function (error) {
      return response.status(400).json(error);
  });
  return response.status(200).json(postResponse.data);
});


// ----------------------------------------------
// Route to process an image at a given URL with specific features
// URI: http://localhost:3000/twsi/cv/detect/url/{features}
app.post('/twsi/cv/detect/url/:features', async (req, res) => {
  const { url } = req.headers;
  const { features } = req.params;
  // Add logic to call Azure's Computer Vision API with the provided URL and features
  // and return the results
  res.json({ url, features, message: 'Processing image at the given URL with specific features' });
});

// ----------------------------------------------
// Route to process an image at a given URL with a single feature
// URI: http://localhost:3000/twsi/cv/detect/url/features/{feature}
app.post('/twsi/cv/detect/url/features/:features', async (req, res) => {
  const { url } = req.headers;
  const { feature } = req.params;
  try {
    // Add your Azure API key and API endpoint
    const azureApiKey = '8fc3e5588bd84720a9142ba5f1eda4a4'; // Replace with your actual API key
    const azureApiUrl = 'https://your-region.api.cognitive.microsoft.com/vision/v3.2/analyze';

    // Make a request to Azure's Computer Vision API
    const response = await axios.post(
      azureApiUrl,
      { url, visualFeatures: feature },
      {
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': azureApiKey,
        },
        params: {
          language: 'en',
          modelVersion: 'latest',
        },
      }
    );

    // Return the results from Azure's API
    res.json({ url, feature, azureApiResponse: response.data });
  } catch (error) {
    console.error('Error calling Azure API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ----------------------------------------------
// Route to process an image at a given URL with details
// URI: http://localhost:3000/twsi/cv/detect/url/details
app.post('/twsi/cv/detect/url/details', async (req, res) => {
  const { url } = req.headers;
  // Add logic to call Azure's Computer Vision API with the provided URL and details
  // and return the results
  res.json({ url, message: 'Processing image at the given URL with details' });
});

// ----------------------------------------------
// Route to process an image at a given URL with a specific detail
// URI: http://localhost:3000/twsi/cv/detect/url/details/{detail}
app.post('/twsi/cv/detect/url/details/:detail', async (req, res) => {
  const { url } = req.headers;
  const { detail } = req.params;
  // Add logic to call Azure's Computer Vision API with the provided URL and a specific detail
  // and return the results
  res.json({ url, detail, message: 'Processing image at the given URL with a specific detail' });
});

// ----------------------------------------------
// Route to handle limited access to Celebrities details
// URI: http://localhost:3000/twsi/cv/detect/url/details/Celebrities
app.post('/twsi/cv/detect/url/details/Celebrities', async (req, res) => {
  res.status(403).json({
    message: 'In order to mitigate the potential for abuse of face detection services, registration is necessary for this Celebrities details feature. To obtain additional information, please reach out to our sales team at sales@twsi.',
  });
});

// ----------------------------------------------
// Route to process an image as a binary file
// URI: http://localhost:3000/twsi/cv/detect/stream
app.post('/twsi/cv/detect/stream', async (req, res) => {
  // Add logic to process the binary image data and call Azure's Computer Vision API
  // and return the results
  res.json({ message: 'Processing image as a binary file' });
});

// ----------------------------------------------
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

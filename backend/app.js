import fs from 'node:fs/promises';  // Using 'fs/promises' for promise-based file operations

import bodyParser from 'body-parser';  // Importing body-parser to parse JSON request bodies
import express from 'express';  // Importing express to create the server

const app = express();  // Creating an instance of express

app.use(bodyParser.json());  // Middleware to parse JSON request bodies
app.use(express.static('public'));  // Serving static files from the 'public' directory

app.use((req, res, next) => {   // Middleware to handle CORS (Cross-Origin Resource Sharing)
  // This middleware sets the necessary headers to allow cross-origin requests.
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');  // Allow specific HTTP methods
  // This allows GET and POST requests from any origin.
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers in the request
  next();  // Call the next middleware or route handler
});

app.get('/meals', async (req, res) => {  // Route to get available meals
  // This route reads the 'available-meals.json' file and returns its content as JSON.
  const meals = await fs.readFile('./data/available-meals.json', 'utf8'); // Read the file asynchronously
  // The 'utf8' encoding is specified to read the file as a string.
  res.json(JSON.parse(meals)); // Parse the JSON content and send it as a response
}); // End of the meals route

app.post('/orders', async (req, res) => {  // Route to create a new order
  // This route handles POST requests to create a new order.
  const orderData = req.body.order; // Extracting the order data from the request body
  // The order data is expected to be in the request body under the 'order' key.

  if (orderData === null || orderData.items === null || orderData.items.length === 0) { // Check if order data is valid 
    // If orderData is null or items are missing or empty, return a 400 Bad Request response.
    // This ensures that the order contains at least one item.
    return res    // Respond with a 400 Bad Request status
      .status(400)    // Set the status code to 400
      .json({ message: 'Missing data.' });  // Send a JSON response with an error message
  }

  if (
    orderData.customer.email === null ||  // Check if customer email is provided
    !orderData.customer.email.includes('@') || // Ensure the email contains '@'
    orderData.customer.name === null || // Check if customer name is provided
    orderData.customer.name.trim() === '' ||  // Ensure the name is not just whitespace
    orderData.customer.street === null ||  // Check if customer street is provided
    orderData.customer.street.trim() === '' ||  // Ensure the street is not just whitespace
    orderData.customer['postal-code'] === null || // Check if customer postal code is provided
    orderData.customer['postal-code'].trim() === '' ||  // Ensure the postal code is not just whitespace
    orderData.customer.city === null || // Check if customer city is provided
    orderData.customer.city.trim() === ''   // Ensure the city is not just whitespace
  ) {   // If any of the required fields are missing or invalid, return a 400 Bad Request response.
    // This ensures that all necessary customer information is provided.
    return res.status(400).json({  // Respond with a 400 Bad Request status
      message:
        'Missing data: Email, name, street, postal code or city is missing.',   // Send a JSON response with an error message
    });
  }

  const newOrder = {  // Create a new order object with a unique ID and the provided order data.
    ...orderData,  // Spread the order data into the new order object
    id: (Math.random() * 1000).toString(),  // Generate a random ID for the order
  };   // The ID is generated as a string to ensure it can be easily used in JSON.
  const orders = await fs.readFile('./data/orders.json', 'utf8');  // Read the existing orders from the 'orders.json' file
  // The 'utf8' encoding is specified to read the file as a string.
  const allOrders = JSON.parse(orders); // Parse the existing orders from the file into a JavaScript array.
  allOrders.push(newOrder);  // Add the new order to the array of existing orders.
  // This updates the list of orders with the newly created order.
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));  // Write the updated orders back to the 'orders.json' file.
  res.status(201).json({ message: 'Order created!' });  // Respond with a 201 Created status and a success message.
  // The '201 Created' status indicates that the order was successfully created.
});

app.use((req, res) => { // Middleware to handle requests that do not match any defined routes.
  if (req.method === 'OPTIONS') {  // Handle preflight requests for CORS
    // This middleware handles preflight requests for CORS.
    return res.sendStatus(200);  // Respond with a 200 OK status for OPTIONS requests
  }

  res.status(404).json({ message: 'Not found' });  // If no matching route is found, respond with a 404 Not Found status and a message.
});  // End of the 404 route

app.listen(3000  
, () => console.log('Server is running on port 3000')
);  // Start the server and listen on port 3000
// The server listens on port 3000 and logs a message when it starts successfully.

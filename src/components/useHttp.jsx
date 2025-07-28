import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  // Function to send an HTTP request
  // This function takes a URL and a configuration object as parameters
  // It uses the Fetch API to send a request to the specified URL with the provided configuration.
  // The configuration object can include method, headers, body, etc.
  // It returns the response data as a JSON object.
  // If the request fails, it throws an error with a message.
  const response = await fetch(url, config); // Send the HTTP request using the Fetch API
  // The fetch function returns a Promise that resolves to the Response object representing the response to the request.
  // The response object contains information about the response, such as status, headers, and body.
  // The config parameter can include options such as method (GET, POST, etc.), headers, body, etc.
  // The response is awaited to ensure that the request is completed before proceeding.
  const resData = await response.json(); // Parse the response data as JSON
  // The response data is parsed as JSON using the json() method of the Response object.
  // This method returns a Promise that resolves to the result of parsing the response body text as JSON.
  if (!response.ok) {
    // Check if the response status is not OK (i.e., not in the range 200-299)
    throw new Error(resData.message || "Request failed!"); // Throw an error if the request failed
    // If the response status is not OK, an error is thrown with the message from the response data or a default message.
  }
  return resData; // Return the parsed response data
}
export default function useHttp(url, config, initialData) {
  // Custom hook to handle HTTP requests
  // This hook takes a URL, configuration object, and initial data as parameters.
  // It uses the Fetch API to send requests and manage the response data, error, and loading state.
  // The url parameter is the endpoint to which the HTTP request will be sent.
  // The config parameter is an object that can include options such as method, headers, body, etc.
  // The initialData parameter is used to set the initial state of the data.
  const [data, setData] = useState(initialData); // State to hold the data returned from the HTTP request
  // The initialData parameter is used to set the initial state of the data.
  // The data state will be updated with the response data from the HTTP request.
  const [error, setError] = useState(); // State to hold any error that occurs during the HTTP request
  const [isLoading, setIsLoading] = useState(false); // State to indicate if the request is currently loading

  function clearData() {
    // Function to clear the data and error states
    setData(initialData); // Reset the data state to the initial data
    setError(null); // Reset the error state
  }

  const sendRequest = useCallback(
    // Function to send the HTTP request
    // The useCallback hook is used to memoize the sendRequest function, so it doesn't change on every render.
    // This is useful to prevent unnecessary re-renders of components that depend on this function.
    async function sendRequest(data) {
      // The data parameter is optional and can be used to send data in the request body (e.g., for POST requests).
      // This function sends an HTTP request to the specified URL with the provided configuration and data.
      setIsLoading(true); // Set loading state to true before sending the request
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data }); // Call the sendHttpRequest function with the URL and configuration
        setData(resData); // Update the data state with the response data
      } catch (error) {
        setError(error.message || "Something went wrong!"); // Set the error state if an error occurs during the request
      }
      setIsLoading(false); // Set loading state to false after the request is completed
    },
    [url, config] // Dependencies for the useCallback hook
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) { // Check if the config is provided and if the method is GET or not specified
      // Automatically send a GET request if no method is specified or if the method is GET
      // This effect runs when the component mounts or when the config changes.
      sendRequest(); // Call the sendRequest function to fetch data
      // This will trigger the HTTP request to the specified URL with the provided configuration.
    }
  }, [sendRequest, config]); // Dependencies for the useEffect hook

  return {
    // Return an object containing the data, error, loading state, and functions
    // This object can be used by components to access the results of the HTTP request.
    data, // The data returned from the HTTP request
    error, // Any error that occurred during the request
    isLoading, // A boolean indicating if the request is currently loading
    sendRequest, // Function to send the HTTP request
    clearData, // Function to clear the data and error states
  };
}

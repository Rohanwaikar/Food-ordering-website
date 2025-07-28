import React from "react";
import MealsItem from "./MealsItem.jsx";
import Error from "./Error.jsx";
import useHttp from "./useHttp.jsx";

const requestConfig = {}; // Configuration for the HTTP request, can be customized if needed

export default function Meals() {
  // Meals component to fetch and display a list of meals
  // This component uses a custom hook useHttp to fetch meals from a local server.
  // The useHttp hook handles the HTTP request and returns the data, error, and loading state.
  // The component renders a list of meals using the MealsItem component.
  // The MealsItem component is used to display each individual meal.
  // The component also handles loading and error states, displaying appropriate messages when fetching data or encountering errors.
  // The requestConfig object can be customized to include headers, method, body, etc. for the HTTP request.
  // The useHttp hook is called with the URL of the meals endpoint and the requestConfig.
  // The meals are fetched from a local server running on http://localhost:3000/meals.
  const {
    data: loadedMeals, // Loaded meals data fetched from the server
    error,  // Error message if the request fails
    isLoading,  // Loading state while fetching data
  } = useHttp("http://localhost:3000/meals", requestConfig, []);  // Fetch meals from the local server using the useHttp hook

  if (isLoading) {  // If the data is still being fetched, show a loading message
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {  // If there is an error fetching the data, show an error message
    return <Error title="An error occurred!" message={error} />;
  }

  return (  
    <ul id="meals">
      {loadedMeals.map((meal) => (   // Map through the loaded meals and render a MealsItem for each
        // Each MealsItem component receives a meal object as a prop to display its details
        // The key prop is set to the meal's id to help React identify which items have changed, are added, or are removed
        // The MealsItem component is responsible for displaying the meal's name, description, and price.
        // The MealsItem component is used to display each individual meal in the list.
        <MealsItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

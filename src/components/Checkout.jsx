import Modal from "./Modal";
import { useContext, useActionState } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./Input";
import useHttp from "./useHttp";

const base_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Base URL for the API, can be set via environment variable

const requestConfig = {
  // Configuration for the HTTP request to submit the order
  method: "POST", // Use POST method to submit the order
  headers: {
    // Set the headers for the request
    "Content-Type": "application/json", // Specify that the request body will be in JSON format
  },
};

export default function Checkout() {
  // Checkout component to handle the checkout process
  const userProgressCtx = useContext(UserProgressContext); // Access the UserProgressContext to manage the user's progress in the application
  const cartCtx = useContext(CartContext); // Access the CartContext to get the cart items and their total price

  const {
    // Use the useHttp hook to send a POST request to submit the order
    data, // Data returned from the server after submitting the order
    error, // Error message if the request fails
    sendRequest, // Function to send the HTTP request
    clearData, // Function to clear the data after the order is submitted
  } = useHttp(`${base_URL}/orders`, requestConfig); // URL to submit the order
  // It takes the URL and request configuration as parameters and returns data, error, sendRequest, and clearData functions.
  const totalAmount = cartCtx.items // Calculate the total amount of the items in the cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  async function checkoutAction(prevState, formData) {
    // Action to handle the checkout process

    const userData = Object.fromEntries(formData.entries()); // Convert the form data to an object

    await sendRequest(
      // Send the HTTP request to submit the order
      JSON.stringify({  
        // Convert the order data to JSON format
        order: {
          // Order data to be sent to the server
          items: cartCtx.items, // Items in the cart
          customer: userData, // User data from the form
        },
      })
    );
  }

  const [formState, formAction, isSending] = useActionState( 
    checkoutAction, // Function to handle the checkout action
    null // Initial state is null, meaning no action is being performed yet
  ); // Use the useActionState hook to manage the form state and handle the checkout action 
  // The formState holds the current state of the form, formAction is the action to be performed on form submission, and isSending indicates if the request is being sent.

  function handleFinish() {  // Function to handle the completion of the checkout process
    // This function is called when the user clicks the "Close" button after the order is placed
    // It hides the checkout modal, clears the cart, and resets the user progress.
    // It also clears the data from the useHttp hook to reset the state.
    userProgressCtx.hideCheckout(); // Hide the checkout modal
    cartCtx.clearCart(); // Clear the cart items
    clearData(); // Clear the data from the useHttp hook
  }

  let actions = (
    <>
      <button type="button" onClick={userProgressCtx.hideCheckout}>  {/* Button to close the checkout modal */}
        Close
      </button>
      <button>Submit Order</button>  {/* Button to submit the order */}
    </>
  );
  if (isSending) {  // If the request is being sent, show a loading message instead of the buttons
    // This indicates that the order data is being sent to the server.
    actions = <p className="center">Sending order data...</p>;
  }

  if (data && !error) {  // If the order is successfully placed and there is no error, show a success message
    // This indicates that the order has been successfully placed and the user can close the modal.
    return (
      <Modal  // Modal component to display the order placed message
        open={userProgressCtx.progress === "checkout"} // Open the modal if the user's progress is "checkout"
        onClose={userProgressCtx.hideCheckout} // Close the modal when the user clicks outside or presses the escape key
      >
        <h2>Order Placed!</h2>
        <p>Thank you for your order!</p>
        <button onClick={handleFinish}>Close</button>  {/* Button to close the modal after the order is placed */}
      </Modal>
    );
  }

  return (
    <Modal  // Modal component for the checkout form
      open={userProgressCtx.progress === "checkout"}  // Open the modal if the user's progress is "checkout"
      onClose={handleFinish}  // Close the modal when the user clicks outside or presses the escape key
    >
      <form action={formAction}>  {/* Form to handle the checkout process */}
        {/* The form uses the formAction function to handle the submission of the order. */}
        <h2>Checkout</h2>
        <p>Total Amount: ${totalAmount} </p>
        <Input label="Your Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="City" type="text" id="city" />
          <Input label="Postal Code" type="text" id="postal-code" />
        </div>

        {error && <Error title="Failed to submit order!" message={error} />}  {/* Display an error message if there is an error submitting the order */}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

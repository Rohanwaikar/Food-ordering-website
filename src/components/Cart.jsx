import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
 
export default function Cart() {
  // Cart component to display the user's shopping cart
  // This component uses the CartContext to access the cart items and their total price.
  // It also uses the UserProgressContext to manage the visibility of the cart modal.
  // The component displays a list of items in the cart, their quantities, and prices.
  // It provides buttons to increase or decrease the quantity of each item and a button to close the cart or proceed to checkout.
  // The cart total is calculated by summing the price of each item multiplied by its quantity.
  // The component uses the useContext hook to access the CartContext and UserProgressContext.
  // The component is wrapped in a Modal to display it as a dialog box.
  // The Modal component is used to create a modal dialog that can be opened and closed.
  // The Cart component is a functional component that uses React hooks to manage state and context.
  // The Cart component is used to display the user's shopping cart in a modal dialog.
  const cartCtx = useContext(CartContext); // Access the CartContext to get cart items and functions
  const userProgressCtx = useContext(UserProgressContext); // Access the UserProgressContext to manage the visibility of the cart modal
  // The cartCtx variable holds the current state of the cart, including items and functions to add or remove items.
  // The userProgressCtx variable holds the current state of the user's progress, including functions to show or hide the cart.
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ); // Calculate the total price of items in the cart by summing the price of each item multiplied by its quantity
  return (
    <Modal // Modal component to display the cart
      className="cart"
      open={userProgressCtx.progress === "cart"}  // Open the modal if the user's progress is "cart"
      onClose={    // Close the modal when the user clicks outside or presses the escape key
        userProgressCtx.progress === "cart" ? userProgressCtx.hideCart : null   // If the progress is "cart", set the onClose function to hideCart; otherwise, set it to null
      }
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (   // Map through the items in the cart and render a CartItem for each
          <CartItem  // CartItem component to display each item in the cart
            key={item.id}  // Unique key for each item to help React identify which items have changed, are added, or are removed
            id={item.id}  // Pass the item's id to the CartItem component   
            name={item.name}  // Pass the item's name to the CartItem component
            quantity={item.quantity}  // Pass the item's quantity to the CartItem component
            price={item.price}  // Pass the item's price to the CartItem component
            onDecrease={() => cartCtx.removeItem(item.id)}   // Function to decrease the quantity of the item when the "-" button is clicked
            onIncrease={() => cartCtx.addItem(item)}  // Function to increase the quantity of the item when the "+" button is clicked
          />
        ))}
      </ul>
      <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>  {/* Display the total price of items in the cart, formatted to two decimal places */}
      <p className="modal-actions">
        <button onClick={userProgressCtx.hideCart}>Close</button>  
        {/* Button to close the cart modal */}
        {cartCtx.items.length > 0 && (  // If there are items in the cart, show the "Go to Checkout" button
          <button onClick={userProgressCtx.showCheckout}>Go to Checkout</button>   
          // Call the showCheckout function from UserProgressContext to display the checkout modal
        )} 
      </p>
    </Modal>
  );
}

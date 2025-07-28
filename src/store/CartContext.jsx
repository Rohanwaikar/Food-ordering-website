import { createContext, useReducer } from "react";

const CartContext = createContext({
  // Create a Context for the cart
  items: [], // Initialize with an empty array for items
  addItem: (item) => {}, // Function to add an item to the cart
  removeItem: (id) => {}, // Function to remove an item from the cart
  clearCart: () => {}, // Function to clear the cart
});

function cartReducer(state, action) {
  // Reducer function to manage cart state
  if (action.type === "ADD_ITEM") {
    // Action to add an item to the cart
    const existingItemIndex = state.items.findIndex(  // Find the index of the item to be added
      // Check if the item already exists in the cart
      (item) => item.id === action.item.id // 
    ); // Check if the item already exists in the cart
    // If the item exists, update its quantity; otherwise, add it as a new item
    const updatedItems = [...state.items]; // Create a copy of the current items in the cart
    if (existingItemIndex >= 0) { 
      // If the item already exists in the cart
      // Update the quantity of the existing item
      // Find the existing item in the cart
      const existingItem = state.items[existingItemIndex]; // Get the existing item from the cart
      const updatedItem = {
        // Create a new item object with updated quantity
        ...existingItem, // Spread the existing item properties
        quantity: state.items[existingItemIndex].quantity + 1, // Increment the quantity by 1
      };
      updatedItems[existingItemIndex] = updatedItem; // Update the item in the cart with the new quantity
    } else {
      updatedItems.push({ ...action.item, quantity: 1 }); // If the item does not exist, add it to the cart with quantity 1
      // Add the new item to the cart with quantity 1
      // The action.item is spread to include all properties of the item, and quantity is set to 1
    }
    return { ...state, items: updatedItems }; // Return the updated state with the new or updated item
  }
  if (action.type === "REMOVE_ITEM") {
    // Action to remove an item from the cart
    // Find the index of the item to be removed
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); // Get the index of the item to be removed
    if (existingItemIndex < 0) {
      // If the item does not exist in the cart, return the current state
      return state; // Return the current state if the item is not found
    }
    const existingItem = state.items[existingItemIndex]; // Get the existing item from the cart
    const updatedItems = [...state.items]; // Create a copy of the current items in the cart
    if (existingItem.quantity === 1) {
      // If the quantity of the item is 1, remove it from the cart
      const updatedItems = state.items.filter((item) => item.id !== action.id); // Filter out the item to be removed
      return { ...state, items: updatedItems }; // Return the updated state with the item removed
    } else {
      const updatedItem = {
        // Create a new item object with updated quantity
        ...existingItem, // Spread the existing item properties
        quantity: existingItem.quantity - 1, // Decrement the quantity by 1
      };
      updatedItems[existingItemIndex] = updatedItem; // Update the item in the cart with the new quantity
    }
    return { ...state, items: updatedItems }; // Return the updated state with the item removed
  }

  if (action.type === "CLEAR_CART") {
    // Action to clear the cart
    return { ...state, items: [] }; // Return the state with an empty items array
  }

  return state; // Return the current state if no action matches
}

export function CartProvider({ children }) {
  // Create a provider component for CartContext
  // Initialize the cart state using useReducer with the cartReducer function and an initial state
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    // Initialize the cart state
    // The initial state of the cart
    items: [], // Start with an empty items array
  });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item }); // Dispatch an action to add an item to the cart
    // This action will be handled by the cartReducer function
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id }); // Dispatch an action to remove an item from the cart by its id
    // This action will be handled by the cartReducer function
  }

  function clearCart() {
    // Dispatch an action to clear the cart
    dispatchCartAction({ type: "CLEAR_CART" }); // This action will be handled by the cartReducer function
  }

  const cartContext = {
    // Create the context value to be provided
    items: cartState.items, // Current items in the cart
    // This allows components to access the current items in the cart
    addItem, // Function to add an item to the cart
    removeItem, // Function to remove an item from the cart
    clearCart, // Function to clear the cart
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider> // Provide the cart context to children components
    // This allows any component within this provider to access the cart context
  );
}

export default CartContext; // Export the CartContext for use in other components

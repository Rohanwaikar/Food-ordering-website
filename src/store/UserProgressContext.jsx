 import { createContext, useState } from "react";

const UserProgressContext = createContext({   // Create a Context for user progress
    progress: '',   // Initialize with an empty string for progress
    showCart: () => {},   // Function to show the cart
    hideCart: () => {},   // Function to hide the cart
    showCheckout : () => {},    // Function to show the checkout
    hideCheckout: () => {},  // Function to hide the checkout
});

export function UserProgressProvider({ children }) {   // Create a provider component for UserProgressContext
    const [progress, setProgress] = useState('');   // State to manage the current progress

    function showCart() {   // Function to show the cart
        setProgress('cart');
    }
    function hideCart() {    // Function to hide the cart
        setProgress('');
    }
    function showCheckout() {   // Function to show the checkout
        setProgress('checkout');
    }
    function hideCheckout() {   // Function to hide the checkout
        setProgress('');
    }

    const userProgressCtx = {   // Context value to be provided
        progress: progress,   // Current progress state
        showCart,           // Function to show the cart
        hideCart,         // Function to hide the cart
        showCheckout, // Function to show the checkout
        hideCheckout, // Function to hide the checkout
    };

    return (
        <UserProgressContext.Provider value={userProgressCtx}>  {/* Provide the context value to children */}
            {children}  {/* Render the children components */}
            {/* This allows any component within this provider to access the user progress context */}
            {/* The children components can use the context to manage user progress state */}
            {/* For example, components can call showCart() to display the cart or hideCart() to hide it */}
        </UserProgressContext.Provider>
    );
}
export default UserProgressContext;   // Export the UserProgressContext for use in other components   
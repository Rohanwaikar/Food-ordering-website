import { useContext } from "react";
import CartContext from "../store/CartContext";
const base_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000"; 
export default function MealsItem({meal}) {  // MealsItem component to display individual meal details
    // This component receives a meal object as a prop and displays its details such as name, price, description, and image.
    // It also provides a button to add the meal to the cart.
    // The component uses the CartContext to access the cart state and the addItem function to add the meal to the cart.
    // The meal prop is expected to be an object with properties: id, name, price, description, and image.
    // The component is a functional component that uses React hooks to manage state and context.
    // The component uses the useContext hook to access the CartContext and call the addItem function when the "Add to Cart" button is clicked.
    const cartCtx = useContext(CartContext);  // Access the CartContext to get the addItem function for adding meals to the cart
    function addToCartHandler() { // Function to handle adding the meal to the cart when the button is clicked
        cartCtx.addItem(meal);  // Call the addItem function from CartContext with the meal object to add it to the cart
        // The addItem function is expected to handle adding the meal to the cart, including updating the quantity if it already exists in the cart.
        // The meal object is passed as an argument to the addItem function, which will handle adding it to the cart.
        // The meal object should contain properties such as id, name, price, description, and image.
        // This function is called when the "Add to Cart" button is clicked, allowing the user to add the meal to their shopping cart.
        // The addToCartHandler function is called when the user clicks the "Add to Cart" button.
        // It uses the addItem function from the CartContext to add the meal to the cart.
    }
    return(
        <li className="meal-item">
            <article>
                <img src={`${base_URL}/${meal.image}`} alt={meal.name} /> {/* Display the meal image */}
                <div className="meal-item__content">
                <h3>{meal.name}</h3> {/* Display the meal name */}
                <p className="meal-item__price">${meal.price}</p> {/* Display the meal price */}
                <p className="meal-item__description">{meal.description}</p> {/* Display the meal description */}
            </div>
            <p className="meal-item__actions">
                <button onClick={addToCartHandler}>Add to Cart</button> {/* Button to add the meal to the cart */}
            </p>
            </article>
            
        </li>
    );
}
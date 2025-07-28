import logoImg from '../assets/logo.jpg';
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
 export default function Header() {
    const cartCtx = useContext(CartContext);    // Access the CartContext to get cart items
    const userProgressCtx = useContext(UserProgressContext); // Access the UserProgressContext to show the cart
    const totalItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);   // Calculate total items in the cart


    function showCartHandler() {    // This function will be called when the cart button is clicked
        userProgressCtx.showCart();  // Call the showCart function from UserProgressContext to display the cart
    }

    return(
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant logo" />
                <h1>React Food</h1>
            </div>
            <nav>
                <button onClick={showCartHandler}>Cart ({totalItems})</button>  {/* Display the total items in the cart */}
            </nav>
        </header>
    );
}
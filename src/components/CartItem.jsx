

export default function CartItem({ name, quantity, price, onIncrease, onDecrease }) {  // CartItem component to display an item in the cart
    // This component displays the name, quantity, and price of an item in the cart.
    // It also provides buttons to increase or decrease the quantity of the item.
    // The component accepts props for the item's name, quantity, price, and functions to handle increasing and decreasing the quantity.
    // The onIncrease and onDecrease functions are called when the respective buttons are clicked.
    return (
        <li className="cart-item">
            <p>
                {name} - {quantity} x {price}  {/* Display the item's name, quantity, and price */}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>  {/* Button to decrease the quantity of the item */}
                <span>{quantity}</span>  {/* Display the current quantity of the item */}
                <button onClick={onIncrease}>+</button>  {/* Button to increase the quantity of the item */}
            </p>
        </li>
    );
}
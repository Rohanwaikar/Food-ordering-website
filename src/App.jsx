import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartProvider } from "./store/CartContext.jsx";
import { UserProgressProvider } from "./store/UserProgressContext.jsx";
function App() {
  return (
    <UserProgressProvider>   {/* Wrap the application in UserProgressProvider to manage user progress state */}
      <CartProvider>  {/* Wrap the application in CartProvider to manage cart state */}
        <Header></Header>  {/* Render the Header component */}
        <Meals></Meals> {/* Render the Meals component to display available meals */}
        <Cart></Cart>  {/* Render the Cart component */}
        <Checkout></Checkout>  {/* Render the Checkout component */}
      </CartProvider>
    </UserProgressProvider>
  );
}

export default App;

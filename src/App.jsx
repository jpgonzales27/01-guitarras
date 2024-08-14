import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  useEffect(() => {
    setData(db);
  }, []);

  function addToCart(item) {
    const itemExits = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExits >= 0) {
      console.log("El elemento ya existe aumento su cantidad en 1");
      const updateCart = [...cart];
      updateCart[itemExits].quantity++;
      setCart(updateCart);
    } else {
      console.log("El elemento no existe Agrengado..");
      item.quantity = 1;
      // setCart((prevCart) => [...prevCart, item]);
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart((prevState) => prevState.filter((item) => item.id !== id));
  }

  function increaseQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_QUANTITY) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCart(updateCart);
  }

  function decrementQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_QUANTITY) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decrementQuantity={decrementQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />;
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;

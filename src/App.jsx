import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

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

  return (
    <>
      <Header />

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

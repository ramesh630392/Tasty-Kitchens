import { createContext, useState } from "react";
import App from "../App";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  const addItem = (item) => {
    setCart([...cart, item]);
  };

  const zeroCart = () =>{
    setCart([]);
  }


  const increaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, count: item.count + 1 } : item));
  };


  const decreaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item
    ));
  };

  return (
    <CartContext.Provider value={{ cart, addItem, increaseQuantity, decreaseQuantity, zeroCart }}>
      <App/>
    </CartContext.Provider>
  );
};

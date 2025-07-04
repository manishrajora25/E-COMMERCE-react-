import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../pages/Firebase";

export const EcomContext = createContext();

function UserContext({ children }) {
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        const storedCart = localStorage.getItem(`cart_${user.email}`);
        setCart(storedCart ? JSON.parse(storedCart) : []);
      } else {
        setCart([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  function handleAddToCart(product) {
    if (productAlreadyExists(product._id)) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === product._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }


  function increaseQuantity(id) {
  setCart(
    cart.map((item) => {
      if (item._id === id) {
        if (item.quantity >= 10) {
          alert("You cannot add more than 10 items.");
          return item;
        }
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    })
  );
}


  function decreaseQuantity(id) {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity -1 : 1 }
          : item
      )
    );
  }

  function productAlreadyExists(id) {
    return cart.some((cartItem) => cartItem.id === id);
  }

  return (
    <EcomContext.Provider
      value={{ cart, setCart, handleAddToCart, decreaseQuantity, increaseQuantity }}
    >
      {children}
    </EcomContext.Provider>
  );
}

export default UserContext;
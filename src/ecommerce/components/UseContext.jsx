// import { createContext, useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../pages/Firebase";

// export const EcomContext = createContext();

// function UserContext({ children }) {
//   const [cart, setCart] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       if (user) {
//         const storedCart = localStorage.getItem(`cart_${user.email}`);
//         setCart(storedCart ? JSON.parse(storedCart) : []);
//       } else {
//         setCart([]);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart));
//     }
//   }, [cart, currentUser]);

//   function handleAddToCart(product) {
//     if (productAlreadyExists(product._id)) {
//       setCart(
//         cart.map((cartItem) =>
//           cartItem._id === product._id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   }


//   function increaseQuantity(id) {
//   setCart(
//     cart.map((item) => {
//       if (item._id === id) {
//         if (item.quantity >= 10) {
//           alert("You cannot add more than 10 items.");
//           return item;
//         }
//         return { ...item, quantity: item.quantity + 1 };
//       }
//       return item;
//     })
//   );
// }


//   function decreaseQuantity(id) {
//     setCart(
//       cart.map((item) =>
//         item._id === id
//           ? { ...item, quantity: item.quantity > 1 ? item.quantity -1 : 1 }
//           : item
//       )
//     );
//   }

//   function productAlreadyExists(id) {
//     return cart.some((cartItem) => cartItem.id === id);
//   }

//   return (
//     <EcomContext.Provider
//       value={{ cart, setCart, handleAddToCart, decreaseQuantity, increaseQuantity }}
//     >
//       {children}
//     </EcomContext.Provider>
//   );
// }

// export default UserContext;







import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const EcomContext = createContext();

function UserContext({ children }) {
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user from backend using token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCurrentUser(null);
      setCart([]);
      return;
    }

    axios
      .get("https://ecommerce-api-8ga2.onrender.com/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCurrentUser(res.data);

        // Load user's cart from localStorage
        const storedCart = localStorage.getItem(`cart_${res.data.email}`);
        setCart(storedCart ? JSON.parse(storedCart) : []);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setCurrentUser(null);
        setCart([]);
      });
  }, []);

  // Save cart to localStorage when cart or user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  // Add product to cart (increase quantity if already exists)
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

  // Increase quantity (max 10)
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

  // Decrease quantity (min 1)
  function decreaseQuantity(id) {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  }

  // Check if product already exists in cart
  function productAlreadyExists(id) {
    return cart.some((cartItem) => cartItem._id === id);
  }

  return (
    <EcomContext.Provider
      value={{
        cart,
        setCart,
        handleAddToCart,
        increaseQuantity,
        decreaseQuantity,
        currentUser,
      }}
    >
      {children}
    </EcomContext.Provider>
  );
}

export default UserContext;

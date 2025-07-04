import React, { useContext, useEffect, useState } from "react";
import { EcomContext } from "../components/UseContext";
import { FaTrashCan, FaCartShopping } from "react-icons/fa6";
import axios from "axios";

function Cart() {
  const { increaseQuantity, decreaseQuantity, setCart } = useContext(EcomContext);
  const [cartItems, setCartItems] = useState([]);
  const [confirmId, setConfirmId] = useState(null);

  // Fetch cart from backend
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(
          "https://ecommerce-api-8ga2.onrender.com/api/cart/get",
          { withCredentials: true }
        );

        console.log("Fetched cart:", response.data);

        // Format items from backend to match frontend structure
        const formattedCart = response.data.items.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));

        setCartItems(formattedCart);
        setCart(formattedCart); // Sync with context
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    fetchCart();
  }, []);

  // Delete product from backend cart and frontend
  const handleDelete = async (id) => {
    try {
      await axios.post(
        "https://ecommerce-api-8ga2.onrender.com/api/cart/remove",
        { productId: id },
        { withCredentials: true }
      );

      const updated = cartItems.filter((item) => item._id !== id);
      setCartItems(updated);
      setCart(updated);
      setConfirmId(null);
      console.log("Product removed from cart.");
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  // Calculate total price
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">
        <FaCartShopping className="cart_icon" /> Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart_img">
                <img src={item.image || item.url} alt={item.name} />
              </div>
              <div className="item-details">
                <h2>{item.name}</h2>
                <h3>{item.category}</h3>
                {/* <p>Price: ₹{item.price}</p> */}
                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="button1"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="button2"
                  >
                    +
                  </button>

                  <div className="delete">
                    <span onClick={() => setConfirmId(item._id)}>
                      <FaTrashCan />
                    </span>
                  </div>
                </div>
                <p>
                  <strong>Total: ₹{item.price * item.quantity}</strong>
                </p>

                {confirmId === item._id && (
                  <div className="confirm-box">
                    <p>Are you sure you want to delete this product?</p>
                    <button onClick={() => handleDelete(item._id)}>Yes</button>
                    <button onClick={() => setConfirmId(null)}>No</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="total-amount">Total: ₹{totalAmount}</div>
        </>
      )}
    </div>
  );
}

export default Cart;

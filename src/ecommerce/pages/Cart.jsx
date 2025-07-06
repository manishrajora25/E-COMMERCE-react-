import React, { useContext, useEffect, useState } from "react";
import { EcomContext } from "../components/UseContext";
import { FaTrashCan, FaCartShopping } from "react-icons/fa6";
import axios from "axios";

function Cart() {
  const { cart, setCart, increaseQuantity, decreaseQuantity } = useContext(EcomContext);
  const [confirmId, setConfirmId] = useState(null);

  // Fetch cart from backend and set context
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(
          "https://ecommerce-api-8ga2.onrender.com/api/cart/get",
          { withCredentials: true }
        );

        const formattedCart = response.data.items.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));

        setCart(formattedCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    fetchCart();
  }, [setCart]);

  const handleDelete = async (id) => {
    try {
      await axios.post(
        "https://ecommerce-api-8ga2.onrender.com/api/cart/remove",
        { productId: id },
        { withCredentials: true }
      );

      const updated = cart.filter((item) => item._id !== id);
      setCart(updated);
      setConfirmId(null);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">
        <FaCartShopping className="cart_icon" /> Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart_img">
                <img src={item.image || item.url} alt={item.name} />
              </div>
              <div className="item-details">
                <h2>{item.name}</h2>
                <h3>{item.category}</h3>

                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item._id)} className="button1">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item._id)} className="button2">+</button>

                  <div className="delete">
                    <span onClick={() => setConfirmId(item._id)} style={{cursor:"pointer"}}>
                      <FaTrashCan />
                      
                    </span>
                  </div>
                </div>

                <p><strong>Total: ₹{item.price * item.quantity}</strong></p>

                {confirmId === item._id && (
                  <div className="confirm-box">
                    <p>Are you sure you want to delete this product?</p>
                    <button onClick={() => handleDelete(item._id)} className="yes">Yes</button>
                    <button onClick={() => setConfirmId(null)} className="no">No</button>
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

// import React, { useContext } from "react";
// import { EcomContext } from "../components/UseContext";
// import { FaTrashCan } from "react-icons/fa6";

// function Cart() {
//   const { cart, increaseQuantity, decreaseQuantity,setCart } = useContext(EcomContext);

//   const totalAmount = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
    
//   function removeItem(id){

//     const updatecart=cart.filter((item)=>item.id!==id)
//     setCart(updatecart)

//   }
//   return (
//     <div className="cart-container">
//       <h2 className="cart-title">Your Shopping Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div className="cart-item" key={item.id}>
//               <img src={item.image} alt={item.title} />
//               <div className="item-details">
//                 <h3>{item.title}</h3>
//                 <p>Price: ₹{item.price}</p>
//                 <div className="quantity-controls">
//                   <button onClick={() => decreaseQuantity(item.id)}>-</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => increaseQuantity(item.id)}>+</button>
//                   <span onClick={()=>removeItem(item.id)}><FaTrashCan /></span>

//                 </div>
//                 <p><strong>Total: ₹{item.price * item.quantity}</strong></p>
//               </div>
//             </div>
//           ))}

//           <div className="total-amount">Total: ₹{totalAmount}</div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;
import React, { useContext, useState } from "react";
import { EcomContext } from "../components/UseContext";
import { FaTrashCan } from "react-icons/fa6";


function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, setCart } = useContext(EcomContext);
  const [confirmId, setConfirmId] = useState(null); 

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDelete = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    setConfirmId(null); 
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart_img" >
              <img src={item.url} alt={item.title}/>
              </div>
              <div className="item-details">
                <h2>{item.name}</h2>
                <h3>{item.description}</h3>
                <p>{item.category}</p>
                {/* <p>Price: ₹{item.price}</p> */}
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item._id)} className="button1">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item._id)} className="button2">+</button>
                
                  <div className="delete">
                  <span onClick={() => setConfirmId(item._id)}><FaTrashCan /></span>
                </div>
                </div>
                <p><strong>Total: ₹{item.price * item.quantity}</strong></p>

              
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

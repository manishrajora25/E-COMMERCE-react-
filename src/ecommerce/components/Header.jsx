// import { useContext, useEffect, useState } from "react";
// import { EcomContext } from "./UseContext";
// import { Link, useNavigate } from "react-router-dom";
// import { GrLogout } from "react-icons/gr";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../pages/Firebase";


// function Header() {
//   const { cart } = useContext(EcomContext);
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       setUser(firebaseUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/");
//     } catch (error) {
//       console.error("Logout Failed:", error);
//     }
//   };

//   return (
//     <header>
//       <h3><Link to="/">Ecommerce</Link></h3>
      
//       <ul >
//         <li><Link to="cart">Cart ({cart.length})</Link></li>
//         <li><Link to="wishlist">Wishlist</Link></li>
//         <li><Link to="about">About</Link></li>
//         {user && (
//           <li
//             onClick={handleLogout}
//             style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" ,color:"black" }}
//           >
//             Logout <GrLogout />
//           </li>
//         )}
//       </ul>
//     </header>
//   );
// }

// export default Header;







import { useContext, useEffect, useState } from "react";
import { EcomContext } from "./UseContext";
import { Link, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { TbLogout2 } from "react-icons/tb";
import { FcLike } from "react-icons/fc";

function Header() {
  const { cart } = useContext(EcomContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(!!token);
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false);
    navigate("/login");
  };

  <style>
    .
  </style>

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h3 className="text-2xl font-bold text-gray-800">
        <Link to="/">Ecommerce</Link>
      </h3>

      <ul>
        <li>
          <Link to="/cart">Cart <span className="cart_length">{cart.length}</span> </Link>
          
        </li>
        <li>
          <Link to="/wishlist"><FcLike /></Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        {user ? (
          <li
            onClick={handleLogout}
            style={{cursor:"pointer" }}
            className="logout"
            
            
          >
            Logout <GrLogout className="logout_icon"/>
          </li>
        ) : (
          <li className="logindata">
            <Link to="/login" >
              Login <TbLogout2  className="login"/>
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;

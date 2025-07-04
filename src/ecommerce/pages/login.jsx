// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./Firebase";
// import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   HiMail,
//   HiLockClosed,
//   HiEye,
//   HiEyeOff,
// } from "react-icons/hi";
// import "./login.css"; 

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchparams] = useSearchParams();
//   const from = searchparams.get("referer") || "/";

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       toast.success("Login Successful!", {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "colored",
//       });
//       setTimeout(() => navigate(from, { replace: true }), 2000);
//     } catch (error) {
//       toast.error(`Login Failed: ${error.message}`, {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "colored",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <ToastContainer />
//       <div className="login-box">
//         <div className="login-header">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
//             alt="Logo"
//             className="logo"
//           />
//           <h1>Welcome Back</h1>
//           <p>Login to your account</p>
//         </div>

//         <form onSubmit={handleLogin} className="login-form">
//           <div className="input-wrapper">
//             <HiMail className="input-icon" />
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               required
//             />
//           </div>

//           <div className="input-wrapper">
//             <HiLockClosed className="input-icon" />
//             <input
//               type={showPassword ? "text" : "password"}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//             />
//             <div
//               className="eye-icon"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <HiEyeOff /> : <HiEye />}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`submit-btn ${loading ? "disabled" : ""}`}
//           >
//             {loading ? <span className="loader"></span> : "Login"}
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/register")}
//             className="register-btn"
//           >
//             Register
//           </button>
//         </form>

//         <p className="footer-text">
//           &copy; {new Date().getFullYear()} Your Company. All rights reserved.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

// const Login = () => {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//     role: "user", // required
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "https://ecommerce-api-8ga2.onrender.com/api/user/login",
//         loginData
//       );
//       const token = res.data.token;
//       localStorage.setItem("token", token);
//       toast.success("Login successful!", { autoClose: 2000 });
//       setTimeout(() => navigate("/"), 2000);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="login-page">
//       <ToastContainer />
//       <form onSubmit={handleSubmit}>
//         <input name="email" placeholder="Email" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;








import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import "react-toastify/dist/ReactToastify.css";
import {
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";
import "./login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "user", // required by backend
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const from = searchparams.get("referer") || "/";

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce-api-8ga2.onrender.com/api/user/login",
        loginData,{withCredentials:true}
      );
      if(res.status===200){

      }

      console.log(res);
      
      const token = res.data.token;
      localStorage.setItem("token", token);

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      setTimeout(() => navigate(from, { replace: true }), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-box">
        <div className="login-header">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
            alt="Logo"
            className="logo"
          />
          <h1>Welcome Back</h1>
          <p>Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-wrapper">
            <HiMail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <HiLockClosed className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <div
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`submit-btn ${loading ? "disabled" : ""}`}
          >
            {loading ? <span className="loader"></span> : "Login"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="register-btn"
          >
            Register
          </button>
        </form>

        <p className="footer-text">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;

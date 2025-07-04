// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./Firebase";
// import { useNavigate } from "react-router-dom";
// import { HiMail, HiLockClosed } from "react-icons/hi";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Register.css"; 

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       toast.success("Registration successful! Please login.", {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "colored",
//       });
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (error) {
//       toast.error(`Error: ${error.message}`, {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "colored",
//       });
//     }
//   };

//   return (
//     <div className="register-page">
//       <ToastContainer />
//       <div className="register-box">
//         <div className="register-header">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
//             alt="Logo"
//             className="logo"
//           />
//           <h1>Create Account</h1>
//           <p>Start your journey with us</p>
//         </div>

//         <form onSubmit={handleRegister} className="register-form">

// <div className="input-wrapper">
//   <input type="text" placeholder="First Name" />
// </div>

// <div className="input-wrapper">
//   <input type="text" placeholder="Last Name" />
// </div>

// <div className="Gender">
// <label htmlFor="">Gender</label>
// <div className="mainGender">
// <input type="radio" name="gender" id="male" />
//   <label htmlFor="male">Male</label>
//   <input type="radio" name="gender" id="female" />
//   <label htmlFor="female">Female</label> 
// </div>
// </div>

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
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </div>
//           </div>

//           <button type="submit" className="submit-btn">
//             Register
//           </button>

//           <p className="login-redirect">
//             Already have an account?{" "}
//             <span onClick={() => navigate("/login")}>Login</span>
//           </p>
//         </form>

//         <p className="footer-text">
//           &copy; {new Date().getFullYear()} Your Company. All rights reserved.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;









// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Register.css"; 

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     gender: "",
//     email: "",
//     password: "",
//     role: "user",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "https://ecommerce-api-8ga2.onrender.com/api/user/register",
//         formData
//       );
//       c
//       toast.success("Registration successful!", { autoClose: 2000 });
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="register-page">
//       <ToastContainer />
//       <form onSubmit={handleSubmit}>
//         <input name="firstname" placeholder="First Name" onChange={handleChange} required />
//         <input name="lastname" placeholder="Last Name" onChange={handleChange} required />
//         <label>
//           <input type="radio" name="gender" value="male" onChange={handleChange} required />
//           Male
//         </label>
//         <label>
//           <input type="radio" name="gender" value="female" onChange={handleChange} />
//           Female
//         </label>
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;









import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    password: "",
    role: "user", // required for backend
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://ecommerce-api-8ga2.onrender.com/api/user/register`,
        formData
      );
      console.log(res);
      

      if (res.status === 201 || res.status === 200) {
        toast.success("Registration successful! Please login.", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="register-page">
      <ToastContainer />
      <div className="register-box">
        <div className="register-header">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
            alt="Logo"
            className="logo"
          />
          <h1>Create Account</h1>
          <p>Start your journey with us</p>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-wrapper">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="Gender">
            <label htmlFor="">Gender</label>
            <div className="mainGender">
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                onChange={handleChange}
                required
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                value="female"
                id="female"
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>

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
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>

          <p className="login-redirect">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>

        <p className="footer-text">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;

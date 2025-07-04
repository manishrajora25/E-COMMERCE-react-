import axios from "axios";
// axios->middleware for interaction between frontend and backend
const Instance =axios.create({
    baseURL:"https://inventory-management-8mn8.onrender.com"

})
export default Instance;
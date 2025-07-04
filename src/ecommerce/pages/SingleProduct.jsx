import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import  {EcomContext } from "../components/UseContext";


function SingleProduct() {
  const { id } = useParams(); 
  const [product, setProduct] = useState({});
  const { handleAddToCart, cart } = useContext(EcomContext);
  const navigate = useNavigate();
  const location = useLocation();


  const token=localStorage.getItem('token');
  const isloggedIn = !!token;
  console.log(isloggedIn);
  
  useEffect(() => {
    
      fetchSingleData();
    
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //   });

  //   return () => unsubscribe();
  // }, []);

  async function fetchSingleData() {
    try {
      const response = await axios.get(
        `https://ecommerce-api-8ga2.onrender.com/api/product/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  const isInCart = product && cart.some((item) => item._id === product._id);

  const handleProtectedAddToCart = () => {
    if (!isloggedIn) {
      navigate(
        `/login?referer=${encodeURIComponent(location.pathname)}&next=/cart`
      );
      return;
    }

    if (!isInCart) {
      handleAddToCart(product);
    }

    navigate("/cart");
  };

  if (!product) {
    return <div className="p-4 text-center">Loading product...</div>;
  }
  // console.log(product);
  

  return (
    <div className="singleProduct">
      <div className="left">
        <img src={product.url} alt={product.title} />
      </div>
      <div className="right">
        <h2>{product.name}</h2>
        <h4>{product.category}</h4>
        <p>{product.description}</p>
        <p>{product.totalRating}</p>
        <p>Price: ₹{product.price}</p>

        <div className="cta">
          <button>Add To Wishlist</button>
          <button
            onClick={handleProtectedAddToCart}
            disabled={isInCart}
            style={{
              backgroundColor: isInCart ? "#ccc" : "#007bff",
              color: isInCart ? "#666" : "#fff",
              cursor: isInCart ? "not-allowed" : "pointer",
            }}
          >
            {isInCart ? "Already in Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>

  );
}

export default SingleProduct;

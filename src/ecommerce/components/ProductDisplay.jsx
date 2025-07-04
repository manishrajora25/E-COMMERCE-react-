import { useContext } from "react";
import { EcomContext } from "./UseContext";
import { Link } from "react-router-dom";

function trimContent(input) {
  return input.length > 50
    ? input.split(" ").slice(0, 3).join(" ") + "..."
    : input;
}


function ProductDisplay({ product }) {
  
// console.log(product);


  return (
    <>
      <div className="product">
        
        <Link to={`/product/${product._id}`}>
          <img src={product.url} alt="" />
          
        </Link>
        <div className="content">
          <h3>{product.name}</h3>
          <p>{ trimContent (product.description)}</p>
          <p> ₹ {product.price}</p>
        </div>
      </div>
    </>
  );
}

export default ProductDisplay;

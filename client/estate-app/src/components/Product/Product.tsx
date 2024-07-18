import { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // api
    fetch("https://fakestoreapi.com/products")
      .then((data) => data.json())
      .then((result) => setProducts(result));
  }, []);

  return (
    <>
      <h1 className="p-2 hover:text-blue-500">
        <Link to="/">
          <i className="fa-solid fa-house px-2"></i>
          <span>Home</span>
        </Link>
      </h1>
      <h1 className="p-4 text-center">Product Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 sm:mx-auto sm:content-center sm:gap-4">
        {products.map((product, index) => {
          return <Card key={index} product={product} />;
        })}
      </div>
    </>
  );
}

export default Product;

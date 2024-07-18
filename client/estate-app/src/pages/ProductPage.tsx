import { useState, useEffect } from "react";
import ListProduct from "../components/Product/ListProduct";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  price: number;
  // Add other properties of the product here if needed
}

function ProductPage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // api
    fetch("https://fakestoreapi.com/products")
      .then((data) => data.json())
      .then((result) => setProducts(result));
  }, []);

  const addToCart = (product: Product) => {
    dispatch(add(product));
  };

  return (
    <div>
      <ListProduct products={products} addToCart={addToCart} />
    </div>
  );
}

export default ProductPage;

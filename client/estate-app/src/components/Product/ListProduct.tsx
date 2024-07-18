import { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

interface ProductItem {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  price: number;
}

interface ListProductProps {
  products: ProductItem[];
  addToCart: (product: ProductItem) => void;
}

function ListProduct({ products, addToCart }: ListProductProps) {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // api
  //   fetch("https://fakestoreapi.com/products")
  //     .then((data) => data.json())
  //     .then((result) => setProducts(result));
  // }, []);

  return (
    <>
      <h1 className="p-4 text-center text-3xl font-bold">Product Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 sm:mx-auto sm:content-center sm:gap-4">
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addToCart={() => addToCart(product)}
            />
          );
        })}
      </div>
    </>
  );
}

export default ListProduct;

import { useState, useEffect } from "react";
import ListProduct from "../components/Product/ListProduct";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import { IProduct } from "../interfaces/Product.interface";
import { RootState } from "../store/store";

function ProductPage() {
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  const products = useSelector((state: RootState) => state.product.data);

  useEffect(() => {
    // api
    // fetch("https://fakestoreapi.com/products")
    //   .then((data) => data.json())
    //   .then((result) => setProducts(result));

    dispatch(getProducts());
  }, [dispatch]);

  const addToCart = (product: IProduct) => {
    dispatch(add(product));
  };

  return (
    <div>
      <h1 className="p-4 text-center text-3xl font-bold">Product Dashboard</h1>
      <ListProduct products={products} addToCart={addToCart} />
    </div>
  );
}

export default ProductPage;

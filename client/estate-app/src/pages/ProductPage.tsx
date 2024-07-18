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
  const { data: products, status } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    // api
    // fetch("https://fakestoreapi.com/products")
    //   .then((data) => data.json())
    //   .then((result) => setProducts(result));

    dispatch(getProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="text-3xl text-center p-4">Loading ....</p>;
  }

  if (status === "error") {
    return (
      <p className="text-3xl text-center text-red-600">
        Something went wrong! Try again later.
      </p>
    );
  }

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

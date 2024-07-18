import React from "react";
import Cart from "../components/Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import ListProduct from "../components/Product/ListProduct";
import { remove } from "../store/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const productsCart = useSelector((state: RootState) => state.cart.carts);

  const removeToCart = (id: number) => {
    dispatch(remove(id));
  };

  return (
    <div>
      <Cart />
      <ListProduct products={productsCart} removeToCart={removeToCart} />
    </div>
  );
}

export default CartPage;

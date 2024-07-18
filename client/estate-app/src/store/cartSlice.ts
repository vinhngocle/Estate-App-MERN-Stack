import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/Product.interface";

interface cartState {
  carts: IProduct[];
}

const initialState: cartState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.carts.push(action.payload);
    },

    remove(state, action) {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;

export default cartSlice.reducer;

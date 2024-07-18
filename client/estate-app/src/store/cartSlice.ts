import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

interface cartState {
  carts: CartItem[];
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
  },
});

export const { add } = cartSlice.actions;

export default cartSlice.reducer;

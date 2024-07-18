import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/Product.interface";
import { AppThunk } from "./store";

interface productState {
  data: IProduct[];
}

const initialState: productState = {
  data: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProducts(state, action) {
      state.data = action.payload;
    },

    // extraReducers: (builder) => {
    //   builder.addCase(getProducts.fulfilled, (state, action) => {
    //     state.data = action.payload;
    //   });
    // },
  },
});

export const { fetchProducts } = productSlice.actions;

export default productSlice.reducer;

// export function getProducts() {
//   return async function getProductsThunk(
//     dispatch: AppDispatch,
//     getState: RootState
//   ) {
//     const response = await fetch("https://fakestoreapi.com/products");
//     const data = await response.json();
//     dispatch(fetchProducts(data));
//   };
// }

export const getProducts = (): AppThunk => async (dispatch, getState) => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  dispatch(fetchProducts(data));
};

// export const getProducts = createAsyncThunk("products/get", async () => {
//   const response = await fetch("https://fakestoreapi.com/products");
//   const data = await response.json();
//   return data;
// });

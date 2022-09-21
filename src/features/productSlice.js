import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// call get api
export const getProduct = createAsyncThunk("products/getProduct", async () => {
  const response = await axios.get("http://localhost:5000/products");
  return response.data;
});

// call post api
export const postProduct = createAsyncThunk(
  "products/postProduct",
  async ({ title, price }) => {
    const response = await axios.post("http://localhost:5000/products", {
      title,
      price,
    });
    return response.data;
  }
);

// call patch api
export const updateProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, title, price }) => {
    const response = await axios.patch(`http://localhost:5000/products/${id}`, {
      title,
      price,
    });
    return response.data;
  }
);

// call delete api
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    return id;
  }
);

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => {
      productEntity.setAll(state, action.payload);
    },
    [postProduct.fulfilled]: (state, action) => {
      productEntity.addOne(state, action.payload);
    },
    [updateProduct.fulfilled]: (state, action) => {
      productEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [deleteProduct.fulfilled]: (state, action) => {
      productEntity.removeOne(state, action.payload);
    },
  },
});

export const productSelectors = productEntity.getSelectors(
  (state) => state.product
);
export default productSlice.reducer;

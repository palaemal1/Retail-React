import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductSliceType,CartType } from "@/api/products/types";

interface ProductState {
  products: ProductSliceType[];
  cart: CartType[];
}

const initialState: ProductState = {
  products: [],
  cart: [],
};

export const productSlice = createSlice({
  name: "Item",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductSliceType[]>) => {
      state.products = action.payload;
    },
    addToCart: (
      state,
      action: PayloadAction<{
        pId: string;
        productName: string;
        price: number;
        stock: number;
        counter: number;
      }>
    ) => {
      const { pId, productName, price, stock, counter } = action.payload;

      const filteredProducts = state.cart.filter(
        (item) => item.productID === pId
      );
      if (filteredProducts.length > 0) {
        const existingProduct = filteredProducts[0];
        if (existingProduct.stock >= counter) {
          existingProduct.count += counter;
          existingProduct.stock -= counter;
        } else {
          alert("Not enough stock for this item!");
        }
      } else {
        if (stock >= counter) {
          const newCartItem: CartType = {
            productID: pId,
            productName: productName,
            stock: stock - counter,
            sellingPrice: price,
            count: counter,
          };
          state.cart = [...state.cart, newCartItem];
        } else {
          alert("Not enough stock for this item!");
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const pId = action.payload;
      state.cart = state.cart.filter((item) => item.productID !== pId);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    submitOrder: (state) => {
      const userId = 780;
      const processOrder = async () => {
        try {
          for (const item of state.cart) {
            const url = `https://localhost:7038/api/Sale/Cashier/view?id=${item.productID}&userId=${userId}`;
            const data = {
              productId: item.productID,
              price: item.sellingPrice,
              qty: item.count || 1,
            };

            const res = await axios.post(url, data, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            
            if (res.status >300) {
             
              console.error("Order submission failed.");
            }
          }
        } catch (error) {
          console.error("Error submitting order:", error);
        }
      };
      processOrder();
    },
  },
});
export const { addToCart, removeFromCart, clearCart, submitOrder } =productSlice.actions;
export default productSlice.reducer;

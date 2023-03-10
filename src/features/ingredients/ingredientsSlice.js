import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "../../axiosOrders";

const initialState = {
  ingredients:
    localStorage.getItem("ingredients") !== null
      ? JSON.parse(localStorage.getItem("ingredients"))
      : {},
  price:
    localStorage.getItem("burgerPrice") !== null
      ? Number(localStorage.getItem("burgerPrice"))
      : 4,
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    try {
      const response = await axios.get("/ingredients.json");

      return response.data;
    } catch (err) {
      return isRejectedWithValue(err);
    }
  }
);

export const ingredientsSlice = createSlice({
  name: "initialIngredients",
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      state.ingredients[action.payload.type] += 1;
      localStorage.setItem("ingredients", JSON.stringify(state.ingredients));
      state.price += action.payload.ingredientPrice;
      localStorage.setItem("burgerPrice", state.price);
    },
    removeIngredients: (state, action) => {
      state.ingredients[action.payload.type] -= 1;
      localStorage.setItem("ingredients", JSON.stringify(state.ingredients));
      state.price -= action.payload.ingredientPrice;
      localStorage.setItem("burgerPrice", state.price);
    },
    restartIngredients: (state) => {
      state.ingredients.bacon = 0;
      state.ingredients.meat = 0;
      state.ingredients.cheese = 0;
      state.ingredients.salad = 0;
      localStorage.setItem("ingredients", JSON.stringify(state.ingredients));
      state.price = 4;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      localStorage.setItem("ingredients", JSON.stringify(state.ingredients));
      state.price = 4;
      localStorage.setItem("burgerPrice", state.price);
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      //state.error = true;
    });
  },
});

export const { addIngredients, removeIngredients, restartIngredients } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "../../axiosOrders";

const initialState = {
  orderStatus: null,
};

export const fetchContactData = createAsyncThunk(
  "contactData/fetchContactData",
  async (order) => {
    try {
      const response = await axios.post("/orders.json", order);

      return response.data;
    } catch (err) {
      return isRejectedWithValue("REJECTED");
    }
  }
);

export const contactDataSlice = createSlice({
  name: "contactData",
  initialState,
  reducers: {
    success: (state, action) => {
      state.orderStatus = "success";
    },
    rejected: (state, action) => {
      state.orderStatus = "rejeitado";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContactData.fulfilled, (state, action) => {
      console.log("Success", action.payload);
    });
    builder.addCase(fetchContactData.rejected, (state, action) => {
      console.log("Rejected", action.error.message);
      console.log(action.error);
    });
  },
});

export const { rejected, success } = contactDataSlice.actions;

export default contactDataSlice.reducer;
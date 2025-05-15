import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu
interface Business {
  id: string;
  author: string;
  time: string;
  content: string;
  like: number;
  coment: number;
  labels: string;
}

interface BusinessState {
  business: Business[];
  isFetching: boolean;
  error: string | null;
}

const initialState: BusinessState = {
  business: [],
  isFetching: false,
  error: null,
};

const businessSlice = createSlice({
  name: "entertaiment",
  initialState,
  reducers: {
    // Lấy danh sách rau
    getAllBusinessStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    getAllBusinessSuccess: (state, action: PayloadAction<Business[]>) => {
      state.isFetching = false;
      state.business = action.payload;
    },
    getAllBusinessFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // Chi tiết rau
    detailBusinessStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    detailBusinessSuccess: (state, action: PayloadAction<Business>) => {
      state.isFetching = false;
      state.business.push(action.payload);
    },
    detailBusinessFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  getAllBusinessStart,
  getAllBusinessSuccess,
  getAllBusinessFailure,
  detailBusinessStart,
  detailBusinessSuccess,
  detailBusinessFailure,
} = businessSlice.actions;

export default businessSlice.reducer;

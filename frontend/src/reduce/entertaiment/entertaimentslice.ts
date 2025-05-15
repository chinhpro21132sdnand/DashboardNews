import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu
interface Entertaiment {
  id: string;
  author: string;
  time: string;
  content: string;
  like: number;
  coment: number;
  labels: string;
}

interface EntertaimentState {
  entertaiments: Entertaiment[];
  isFetching: boolean;
  error: string | null;
}

const initialState: EntertaimentState = {
  entertaiments: [],
  isFetching: false,
  error: null,
};

const entertaimentSlice = createSlice({
  name: "entertaiment",
  initialState,
  reducers: {
    // Lấy danh sách rau
    getAllEntertaimentStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    getAllEntertaimentSuccess: (
      state,
      action: PayloadAction<Entertaiment[]>
    ) => {
      state.isFetching = false;
      state.entertaiments = action.payload;
    },
    getAllEntertaimentFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // Chi tiết rau
    detailEntertaimentStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    detailEntertaimentSuccess: (state, action: PayloadAction<Entertaiment>) => {
      state.isFetching = false;
      state.entertaiments.push(action.payload);
    },
    detailEntertaimentFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    // Cập nhật rau
  },
});

// Export actions
export const {
  getAllEntertaimentFailure,
  getAllEntertaimentStart,
  getAllEntertaimentSuccess,
  detailEntertaimentFailure,
  detailEntertaimentStart,
  detailEntertaimentSuccess,
} = entertaimentSlice.actions;

export default entertaimentSlice.reducer;

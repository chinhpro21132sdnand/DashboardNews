import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu
interface Politics {
  id: string;
  author: string;
  time: string;
  content: string;
  like: number;
  coment: number;
  labels: string;
}

interface PoliticsState {
  politics: Politics[];
  isFetching: boolean;
  error: string | null;
}

const initialState: PoliticsState = {
  politics: [],
  isFetching: false,
  error: null,
};

const politicSlice = createSlice({
  name: "entertaiment",
  initialState,
  reducers: {
    // Lấy danh sách rau
    getAllPoliticsStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    getAllPoliticsSuccess: (state, action: PayloadAction<Politics[]>) => {
      state.isFetching = false;
      state.politics = action.payload;
    },
    getAllPoliticsFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // Chi tiết rau
    detailPoliticsStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    detailPoliticsSuccess: (state, action: PayloadAction<Politics>) => {
      state.isFetching = false;
      state.politics.push(action.payload);
    },
    detailPoliticsFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    // Cập nhật rau
  },
});

// Export actions
export const {
  getAllPoliticsStart,
  getAllPoliticsSuccess,
  getAllPoliticsFailure,
  detailPoliticsStart,
  detailPoliticsSuccess,
  detailPoliticsFailure,
} = politicSlice.actions;

export default politicSlice.reducer;

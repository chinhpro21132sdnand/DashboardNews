import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu
interface Vegetable {
  id: string;
  name: string;
  price: number;
  content: string;
  number: number;
  unit: string;
  supplier: string;
  isActive: boolean;
}

interface VegetableState {
  vegetables: Vegetable[];
  isFetching: boolean;
  error: string | null;
}

const initialState: VegetableState = {
  vegetables: [],
  isFetching: false,
  error: null,
};

const vegetableSlice = createSlice({
  name: "vegetable",
  initialState,
  reducers: {
    // Lấy danh sách rau
    getAllVegetableStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    getAllVegetableSuccess: (state, action: PayloadAction<Vegetable[]>) => {
      state.isFetching = false;
      state.vegetables = action.payload;
    },
    getAllVegetableFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // Thêm rau
    addVegetableStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    addVegetableSuccess: (state, action: PayloadAction<Vegetable>) => {
      state.isFetching = false;
      state.vegetables.push(action.payload);
    },
    addVegetableFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    // Chi tiết rau
    detailVegetableStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    detailVegetableSuccess: (state, action: PayloadAction<Vegetable>) => {
      state.isFetching = false;
      state.vegetables.push(action.payload);
    },
    detailVegetableFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    // Cập nhật rau
    updateVegetableStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    updateVegetableSuccess: (state, action: PayloadAction<Vegetable>) => {
      state.isFetching = false;
      const index = state.vegetables.findIndex(
        (v) => v?.id === action.payload?.id
      );
      if (index !== -1) state.vegetables[index] = action.payload;
    },
    updateVegetableFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // Xóa rau
    deleteVegetableStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    deleteVegetableSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.vegetables = state.vegetables.filter(
        (v) => v.id !== action.payload
      );
    },
    deleteVegetableFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  getAllVegetableStart,
  getAllVegetableSuccess,
  getAllVegetableFailure,
  addVegetableStart,
  addVegetableSuccess,
  addVegetableFailure,
  updateVegetableStart,
  detailVegetableStart,
  detailVegetableSuccess,
  detailVegetableFailure,
  updateVegetableSuccess,
  updateVegetableFailure,
  deleteVegetableStart,
  deleteVegetableSuccess,
  deleteVegetableFailure,
} = vegetableSlice.actions;

export default vegetableSlice.reducer;

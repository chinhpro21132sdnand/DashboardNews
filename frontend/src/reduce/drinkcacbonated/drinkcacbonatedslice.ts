import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu
interface Drinkcacbonated {
  id: string;
  name: string;
  price: number;
  content: string;
  number: number;
  unit: string;
  supplier: string;
  isActive: boolean;
}

interface DrinkcacbonatedState {
  Drinkcacbonateds: Drinkcacbonated[];
  isFetching: boolean;
  error: string | null;
}

const initialState: DrinkcacbonatedState = {
  Drinkcacbonateds: [],
  isFetching: false,
  error: null,
};

const DrinkcacbonatedSlice = createSlice({
  name: "Drinkcacbonated",
  initialState,
  reducers: {
    // Lấy danh sách rau
    getAllDrinkVegetableStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    getAllDrinkVegetableSuccess: (
      state,
      action: PayloadAction<Drinkcacbonated[]>
    ) => {
      state.isFetching = false;
      state.Drinkcacbonateds = action.payload;
    },
    getAllDrinkVegetableFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // Thêm rau
    addDrinkVegetableStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    addDrinkVegetableSuccess: (
      state,
      action: PayloadAction<Drinkcacbonated>
    ) => {
      state.isFetching = false;
      state.Drinkcacbonateds.push(action.payload);
    },
    addDrinkVegetableFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    // Chi tiết rau
    detailDrinkVegetableStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    detailDrinkVegetableSuccess: (
      state,
      action: PayloadAction<Drinkcacbonated>
    ) => {
      state.isFetching = false;
      state.Drinkcacbonateds.push(action.payload);
    },
    detailDrinkVegetableFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    // Cập nhật rau
    updateDrinkVegetableStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    updateDrinkVegetableSuccess: (
      state,
      action: PayloadAction<Drinkcacbonated>
    ) => {
      state.isFetching = false;
      const index = state.Drinkcacbonateds.findIndex(
        (v) => v?.id === action.payload?.id
      );
      if (index !== -1) state.Drinkcacbonateds[index] = action.payload;
    },
    updateDrinkVegetableFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // Xóa rau
    deleteDrinkVegetableStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    deleteDrinkVegetableSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.Drinkcacbonateds = state.Drinkcacbonateds.filter(
        (v) => v.id !== action.payload
      );
    },
    deleteDrinkVegetableFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  getAllDrinkVegetableSuccess,
  getAllDrinkVegetableFailure,
  getAllDrinkVegetableStart,
  addDrinkVegetableStart,
  addDrinkVegetableSuccess,
  addDrinkVegetableFailure,
  detailDrinkVegetableStart,
  detailDrinkVegetableSuccess,
  detailDrinkVegetableFailure,
  updateDrinkVegetableStart,
  updateDrinkVegetableSuccess,
  updateDrinkVegetableFailure,
  deleteDrinkVegetableStart,
  deleteDrinkVegetableSuccess,
  deleteDrinkVegetableFailure,
} = DrinkcacbonatedSlice.actions;

export default DrinkcacbonatedSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu
interface Dashboard {
  business: number;
  tech: number;
  entertainment: number;
  politics: number;
}

interface DashboardState {
  dashboard: Dashboard[];
  isFetching: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  dashboard: [],
  isFetching: false,
  error: null,
};

const DasboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // Lấy danh sách rau
    getAllDashboardStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    getAllDashboardSuccess: (state, action: PayloadAction<Dashboard[]>) => {
      state.isFetching = false;
      state.dashboard = action.payload;
    },
    getAllDashboardFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  getAllDashboardStart,
  getAllDashboardSuccess,
  getAllDashboardFailure,
} = DasboardSlice.actions;

export default DasboardSlice.reducer;

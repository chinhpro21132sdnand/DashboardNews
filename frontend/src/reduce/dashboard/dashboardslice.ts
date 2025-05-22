import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu
interface Dashboard {
  business: number;
  tech: number;
  entertainment: number;
  politics: number;
}
interface hotdashboard {
  id: string;
  author: string;
  time: string;
  content: string;
  like: number;
  coment: number;
  labels: string;
}
interface Dashboard2 {
  business: hotdashboard;
  tech: hotdashboard;
  entertainment: hotdashboard;
  politics: hotdashboard;
}

interface DashboardState {
  dashboard: Dashboard[];
  dashboard2: Dashboard2[];
  isFetching: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  dashboard: [],
  dashboard2: [],
  isFetching: false,
  error: null,
};

const DasboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
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

    getHotDashboardStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    getHotDashboardSuccess: (state, action: PayloadAction<Dashboard2[]>) => {
      state.isFetching = false;
      state.dashboard2 = action.payload;
    },
    getHotDashboardFailure: (state, action: PayloadAction<string>) => {
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
  getHotDashboardStart,
  getHotDashboardSuccess,
  getHotDashboardFailure,
} = DasboardSlice.actions;

export default DasboardSlice.reducer;

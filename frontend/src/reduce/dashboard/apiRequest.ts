import API from "@/utils/axiosConfig";
import { AppDispatch } from "../store"; // Import AppDispatch từ store
import {
  getAllDashboardStart,
  getAllDashboardSuccess,
  getAllDashboardFailure,
} from "./dashboardslice";
interface dataDate {
  start: Date | null;
  end: Date | null;
}
export const getAllDashboard = async (
  dispatch: AppDispatch,
  payload: dataDate
) => {
  dispatch(getAllDashboardStart());
  try {
    const res = await API.post(`/v1/labels/dashboard`, payload);
    dispatch(getAllDashboardSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(getAllDashboardFailure((error as Error).message));
  }
};

import API from "@/utils/axiosConfig";
import { AppDispatch } from "../store"; // Import AppDispatch từ store
import {
  getAllVegetableSuccess,
  getAllVegetableFailure,
  getAllVegetableStart,
  detailVegetableStart,
  detailVegetableSuccess,
  detailVegetableFailure,
} from "./vegatableslice";

export const getAllvegetale = async (dispatch: AppDispatch, params: string) => {
  dispatch(getAllVegetableStart());
  try {
    const res = await API.get(`/v1/labels/tech${params}`);
    dispatch(getAllVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(getAllVegetableFailure((error as Error).message));
  }
};

export const detailVegetable = async (dispatch: AppDispatch, id: string) => {
  dispatch(detailVegetableStart());
  try {
    const res = await API.get(`/v1/labels/tech/${id}`);
    console.log(res, "resssss");
    dispatch(detailVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(detailVegetableFailure((error as Error).message));
  }
};

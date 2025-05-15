import API from "@/utils/axiosConfig";
import { AppDispatch } from "../store"; // Import AppDispatch từ store
import {
  getAllBusinessStart,
  getAllBusinessSuccess,
  getAllBusinessFailure,
  detailBusinessStart,
  detailBusinessSuccess,
  detailBusinessFailure,
} from "./businessslice";
// interface Vegetable {
//   name: string;
//   price: number;
//   content: string;
//   number: number;
//   unit: string;
//   supplier: string;
// }
export const getAllBusiness = async (dispatch: AppDispatch, params: string) => {
  dispatch(getAllBusinessStart());
  try {
    const res = await API.get(`/v1/labels/business${params}`);
    dispatch(getAllBusinessSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(getAllBusinessFailure((error as Error).message));
  }
};

export const detailBusiness = async (dispatch: AppDispatch, id: string) => {
  dispatch(detailBusinessStart());
  try {
    const res = await API.get(`/v1/labels/business/${id}`);
    console.log(res, "resssss");
    dispatch(detailBusinessSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(detailBusinessFailure((error as Error).message));
  }
};

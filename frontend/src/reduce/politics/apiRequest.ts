import API from "@/utils/axiosConfig";
import { AppDispatch } from "../store"; // Import AppDispatch từ store
import {
  getAllPoliticsStart,
  getAllPoliticsSuccess,
  getAllPoliticsFailure,
  detailPoliticsStart,
  detailPoliticsSuccess,
  detailPoliticsFailure,
} from "./politicsslice";
// interface Vegetable {
//   name: string;
//   price: number;
//   content: string;
//   number: number;
//   unit: string;
//   supplier: string;
// }
export const getAllPolitics = async (dispatch: AppDispatch, params: string) => {
  dispatch(getAllPoliticsStart());
  try {
    const res = await API.get(`/v1/labels/politics${params}`);
    dispatch(getAllPoliticsSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(getAllPoliticsFailure((error as Error).message));
  }
};

export const detailPolitics = async (dispatch: AppDispatch, id: string) => {
  dispatch(detailPoliticsStart());
  try {
    const res = await API.get(`/v1/labels/politics/${id}`);
    console.log(res, "resssss");
    dispatch(detailPoliticsSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(detailPoliticsFailure((error as Error).message));
  }
};

import API from "@/utils/axiosConfig";
import { AppDispatch } from "../store"; // Import AppDispatch từ store
import {
  getAllEntertaimentFailure,
  getAllEntertaimentStart,
  getAllEntertaimentSuccess,
  detailEntertaimentFailure,
  detailEntertaimentStart,
  detailEntertaimentSuccess,
} from "./entertaimentslice";
// interface Vegetable {
//   name: string;
//   price: number;
//   content: string;
//   number: number;
//   unit: string;
//   supplier: string;
// }
export const getAllEntertaiment = async (
  dispatch: AppDispatch,
  params: string
) => {
  dispatch(getAllEntertaimentStart());
  try {
    const res = await API.get(`/v1/labels/entertaiment${params}`);
    dispatch(getAllEntertaimentSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(getAllEntertaimentFailure((error as Error).message));
  }
};

export const detailEntertaiment = async (dispatch: AppDispatch, id: string) => {
  dispatch(detailEntertaimentStart());
  try {
    const res = await API.get(`/v1/labels/entertaiment/${id}`);
    console.log(res, "resssss");
    dispatch(detailEntertaimentSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(detailEntertaimentFailure((error as Error).message));
  }
};

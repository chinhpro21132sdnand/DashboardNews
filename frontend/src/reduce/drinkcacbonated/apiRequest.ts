import API from "@/utils/axiosConfig";
import { AppDispatch } from "../store"; // Import AppDispatch từ store
import {
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
} from "./drinkcacbonatedslice";
interface DrinkVegetable {
  name: string;
  price: number;
  number: number;
  unit: string;
  supplier: string;
}
export const getAllDrinkVegetable = async (
  dispatch: AppDispatch,
  params: string
) => {
  dispatch(getAllDrinkVegetableStart());
  try {
    const res = await API.get(`/v1/drink/cacbonatedDrink${params}`);
    dispatch(getAllDrinkVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(getAllDrinkVegetableFailure((error as Error).message));
  }
};
export const addDrinkVegetable = async (
  dispatch: AppDispatch,
  payload: DrinkVegetable
) => {
  dispatch(addDrinkVegetableStart());
  try {
    const res = await API.post("/v1/drink/cacbonatedDrink", payload);
    dispatch(addDrinkVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(addDrinkVegetableFailure((error as Error).message));
  }
};
export const detailDrinkVegetable = async (
  dispatch: AppDispatch,
  id: string
) => {
  dispatch(detailDrinkVegetableStart());
  try {
    const res = await API.get(`/v1/drink/cacbonatedDrink/${id}`);
    console.log(res, "resssss");
    dispatch(detailDrinkVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(detailDrinkVegetableFailure((error as Error).message));
  }
};
export const updateDrinkVegetable = async (
  dispatch: AppDispatch,
  payload: DrinkVegetable,
  id: string
) => {
  dispatch(updateDrinkVegetableStart());
  try {
    const res = await API.post(`/v1/drink/cacbonatedDrink/${id}`, payload);
    dispatch(updateDrinkVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(updateDrinkVegetableFailure((error as Error).message));
  }
};
export const delleteDrinkVegetable = async (
  dispatch: AppDispatch,
  id: string
) => {
  dispatch(deleteDrinkVegetableStart());
  try {
    const res = await API.delete(`/v1/drink/cacbonatedDrink/${id}`);
    dispatch(deleteDrinkVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(deleteDrinkVegetableFailure((error as Error).message));
  }
};

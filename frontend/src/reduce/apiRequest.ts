import API from "@/utils/axiosConfig";
import { loginFailure, loginStart, loginSuccess } from "./authslice";

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await API.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    console.error(error);
    dispatch(loginFailure());
  }
};

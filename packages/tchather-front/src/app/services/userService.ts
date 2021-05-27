import { Asserts } from "yup";
import { userLoginSchema } from "@tchather/common";
import { Axios } from "../utils/axiosClient";
export const userLogin = async (body: Asserts<typeof userLoginSchema>) => {
  try {
    console.debug("[services/userService -> userLogin] entered in function");
    const response = await Axios.post("/users/login", body);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

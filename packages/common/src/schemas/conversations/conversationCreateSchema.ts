import * as yup from "yup";
import {
  REQUIRED_ERROR_MESSAGE,
  INVALID_USERS_NUMBERS,
} from "../../constants/errorMessages";

export const conversationCreateSchema = yup.object().shape({
  conversationName: yup.string().required(REQUIRED_ERROR_MESSAGE),
  conversationUsers: yup
    .array()
    .required(REQUIRED_ERROR_MESSAGE)
    .min(1, INVALID_USERS_NUMBERS),
});
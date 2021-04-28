import * as yup from "yup"
import { REQUIRED_ERROR_MESSAGE, INVALID_EMAIL_ERROR_MESSAGE } from '../../constants/errorMessages';

export const userLoginSchema = yup.object().shape({
    userEmail: yup.string().email(INVALID_EMAIL_ERROR_MESSAGE).required(REQUIRED_ERROR_MESSAGE),
    userPassword: yup.string().required(REQUIRED_ERROR_MESSAGE)
})
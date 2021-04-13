import * as yup from "yup"
import { REQUIRED_ERROR_MESSAGE, INVALID_EMAIL_ERROR_MESSAGE } from '../../constants/errorMessages';

export const userRegisterSchema = yup.object().shape({
    userName: yup.string().required(REQUIRED_ERROR_MESSAGE).min(3, "Le nom doit faire un minimum de 4 caractères"),
    userEmail: yup.string().email(INVALID_EMAIL_ERROR_MESSAGE).required(REQUIRED_ERROR_MESSAGE),
    userPassword: yup.string().required(REQUIRED_ERROR_MESSAGE).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Le mot de passe doit contenir un caractère spécial, une lettre majuscule, minuscule, chiffre et doit faire au minimum 8 caractère"),
    userConfirmPassword: yup.string().oneOf([yup.ref('userPassword'), undefined], "Les mots ne correspondent pas").required(REQUIRED_ERROR_MESSAGE),
})
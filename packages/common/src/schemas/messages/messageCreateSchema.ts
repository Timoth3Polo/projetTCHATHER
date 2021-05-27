import * as yup from "yup";
import {
  REQUIRED_ERROR_MESSAGE,
} from "../../constants/errorMessages";

export const messageCreateSchema = yup.object().shape({
  messageText: yup.string().required(REQUIRED_ERROR_MESSAGE).trim().min(1),
  messageAttachments: yup
    .array()
    .notRequired()
});
//trim() =>
// "    azdazdazd      "
//"azdazdazd"
// "              "
// ""

// messageId String @id @default(uuid())
// messageText String
// messageAttachements Attachement[]
// conversations Conversation[]
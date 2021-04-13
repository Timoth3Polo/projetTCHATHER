import {
  BadRequestError,
  Body,
  JsonController,
  Post,
} from "routing-controllers";
import { userRegisterSchema } from "@tchather/common";
import { Asserts } from "yup";
import { hash } from "bcrypt";
import { prismaClient } from "../utils/prismaClient";
@JsonController("/users")
export class UserController {
  @Post("/register")
  async registerUser(@Body() body: Asserts<typeof userRegisterSchema>) {
    try {
      await userRegisterSchema.validate(body, { abortEarly: false });
    } catch (error) {
      throw new BadRequestError(error);
    }
    const { userPassword, userConfirmPassword, ...user } = body;
    const hashedPassword = await hash(userPassword, 12);

    const savedUser = await prismaClient.user.create({
      data: { ...user, userPassword: hashedPassword },
      select: {
        userId: true,
        userConversations: true,
        userEmail: true,
        userName: true,
      },
    });

    return savedUser;
  }
}

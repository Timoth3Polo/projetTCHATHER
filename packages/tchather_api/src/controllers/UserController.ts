import {
  BadRequestError,
  Body,
  JsonController,
  NotFoundError,
  Post,
} from "routing-controllers";
import { userRegisterSchema, userLoginSchema } from "@tchather/common";
import { Asserts } from "yup";
import { compare, hash } from "bcrypt";
import { prismaClient } from "../utils/prismaClient";
import { sign } from "jsonwebtoken";
import { Env } from "../utils/Env";
@JsonController("/users")
export class UserController {
  @Post("/register")
  async registerUser(@Body() body: Asserts<typeof userRegisterSchema>) {
    try {
      await userRegisterSchema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });
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

  @Post("/login")
  async loginUser(@Body() userLoginData: Asserts<typeof userLoginSchema>) {
    try {
      await userLoginSchema.validate(userLoginData, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (error) {
      throw new BadRequestError(error);
    }

    const user = await prismaClient.user.findUnique({
      where: { userEmail: userLoginData.userEmail },
    });

    if (!user) {
      throw new NotFoundError("Aucun utilisateur n'a été trouvé.");
    }

    const isUserPasswordValid = await compare(
      userLoginData.userPassword,
      user.userPassword
    );

    if (!isUserPasswordValid) {
      throw new BadRequestError("Aucun utilisateur n'a été trouvé.");
    }

    const userToken = sign({ userId: user.userId }, Env.APP_JWT_SECRET, {
      expiresIn: "7d",
    });

    return { userToken };
  }
}

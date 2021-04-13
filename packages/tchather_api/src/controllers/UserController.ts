import { BadRequestError, Body, JsonController, Post } from 'routing-controllers';
import { prismaClient } from "../utils/prismaClient";
import { Asserts } from 'yup';
import { userRegisterSchema } from '@tchather/common';

@JsonController("/users")
export class UserController {
    @Post("/register")
    async registerUser(@Body() body: Asserts<typeof userRegisterSchema>) {
        try {
            await userRegisterSchema.validate(body, {abortEarly: false});
        } catch (error) {
            throw new BadRequestError(error);
        }
        
        
        await prismaClient.user.create({data:body});
    }
}
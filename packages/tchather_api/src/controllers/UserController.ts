import { BadRequestError, Body, JsonController, Post } from 'routing-controllers';
import { userRegisterSchema } from "@tchather/common";
import { Asserts } from 'yup';

@JsonController("/users")
export class UserController {
    @Post("/register")
    async registerUser(@Body() body: Asserts<typeof userRegisterSchema>) {
        try {
            await userRegisterSchema.validate(body, {abortEarly: false});
        } catch (error) {
            throw new BadRequestError(error);
        }
    }
}
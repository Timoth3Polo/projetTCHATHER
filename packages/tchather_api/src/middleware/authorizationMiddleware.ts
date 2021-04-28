import { Action } from "routing-controllers";
import { verify } from "jsonwebtoken";
import { Env } from '../utils/Env';

export const authorizationMiddleware = (action: Action, role: Array<any>) => {

    const authorizationToken = action.request.headers['authorization'];

    if(!authorizationToken) {
        return false;
    }
    const [ ,token] = authorizationToken.split("Bearer ");

    if(!token) {
        return false;
    }

    try {
        verify(token, Env.APP_JWT_SECRET);
    }
    catch(error) {
        return false;
    }

    return true;
}
import { Action } from "routing-controllers";
import { decode } from "jsonwebtoken";
import { Env } from "../utils/Env";
import { prismaClient } from "../utils/prismaClient";
import { IToken } from '../interfaces/IToken';

export const currentUserChecker = async (action: Action) => {
  const authorizationToken = action.request.headers["authorization"];

  const [, token] = authorizationToken.split("Bearer ");

  const decodedToken: IToken = (decode(token) as IToken);

  const user = prismaClient.user.findUnique({
    where: { userId : decodedToken.userId },
  });

  return user;
};

import { createExpressServer } from "routing-controllers";
import { StatusController } from "./controllers/StatusControllers";
import { UserController } from "./controllers/UserController";
import { authorizationMiddleware } from "./middleware/authorizationMiddleware";
import { currentUserChecker } from "./middleware/currentUserMiddleware";
import { ConversationsController } from './controllers/ConversationController';

export const app = createExpressServer({
    controllers: [StatusController, UserController, ConversationsController],
    routePrefix: "/api",
    authorizationChecker: authorizationMiddleware,
    currentUserChecker: currentUserChecker,
    validation: false,
});
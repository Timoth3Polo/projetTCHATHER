import { createExpressServer } from "routing-controllers";
import { StatusController } from "./controllers/StatusControllers";
import { UserController } from "./controllers/UserController";
import { authorizationMiddleware } from "./middleware/authorizationMiddleware";
import { currentUserChecker } from "./middleware/currentUserMiddleware";
import { ConversationsController } from './controllers/ConversationController';
import { MessageController } from './controllers/MessageController';

export const app = createExpressServer({
    controllers: [StatusController, UserController, ConversationsController, MessageController],
    routePrefix: "/api",
    cors: '*',
    authorizationChecker: authorizationMiddleware,
    currentUserChecker: currentUserChecker,
    validation: false,
});
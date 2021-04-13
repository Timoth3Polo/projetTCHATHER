import "reflect-metadata";
import { createExpressServer } from 'routing-controllers'; 
import { StatusController } from './controllers/StatusControllers';
import { UserController } from './controllers/UserController';
import {json} from "express";
import morgan from "morgan";

const app = createExpressServer({
    controllers: [StatusController, UserController],
    routePrefix: "/api",
    validation: false,
});

app.use(json());
app.use(morgan("dev"));

app.listen(8080, () => console.log("App started at :8080 🚀"))
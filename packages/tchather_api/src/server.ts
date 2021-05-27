import "reflect-metadata";
import { json } from "express";
import morgan from "morgan";
import { app } from "./index";

app.use(json());
app.use(morgan("dev"));

app.listen(8080, () => console.log("App started at :8080 🚀"))
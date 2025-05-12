import express from "express";
import { libraryRouter } from "./library/index.mts";
var app = express();
app.use("/library", libraryRouter);
export default app;

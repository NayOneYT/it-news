import express from "express";
import { connect } from "mongoose";
import { MONGODB_URL, PORT } from "./config.js";
import { ArticlesRouter } from "./router/articles.js";
import { CommentsRouter } from "./router/comments.js";
connect(MONGODB_URL)
    .then(() => {
    console.log("Подключились к БД");
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/articles", ArticlesRouter);
app.use("/api/comments", CommentsRouter);
app.listen(PORT, () => {
    console.log("Сервер запущен");
});

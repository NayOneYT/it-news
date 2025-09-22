var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { Comments } from "../models/comments.js";
const router = Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article_id = req.query.article_id;
        const query = article_id ? { article_id } : {};
        const getComments = yield Comments.find(query).sort({ published: -1 });
        if (!getComments)
            throw new Error("No items");
        res.status(200).send(getComments);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: "Ошибка сервера" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const text = req.body.text;
        const article_id = req.body.article_id;
        const newComment = new Comments({
            name: name,
            text: text,
            article_id: article_id
        });
        const saveComment = yield newComment.save();
        res.status(201).send(saveComment);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: "Ошибка сервера" });
    }
}));
export const CommentsRouter = router;

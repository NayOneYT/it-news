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
import { Articles } from "../models/articles.js";
const router = Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getArticles = yield Articles.find().sort({ published: -1 });
        if (!getArticles)
            throw new Error("No items");
        res.status(200).send(getArticles);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield Articles.findById(req.params.id);
        res.status(200).send(article);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: "Ошибка сервера" });
    }
}));
export const ArticlesRouter = router;

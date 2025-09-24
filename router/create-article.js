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
import multer from "multer";
import path from "path";
import fs from "fs";
const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/", upload.single("img"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, anons, full_text } = req.body;
        if (!title || !anons || !full_text) {
            return res.status(400).json({ message: "Заполните все поля" });
        }
        const article = new Articles({
            title,
            anons,
            full_text
        });
        const savedArticle = yield article.save();
        if (req.file) {
            const imgPath = path.resolve("public/public/img");
            const fileName = `${savedArticle._id}.jpg`;
            const fullPath = path.join(imgPath, fileName);
            fs.mkdirSync(imgPath, { recursive: true });
            fs.writeFileSync(fullPath, req.file.buffer);
            savedArticle.img = `/img/${fileName}`;
            yield savedArticle.save();
        }
        res.status(201).json({ message: "Статья добавлена", article: savedArticle });
    }
    catch (err) {
        console.error("Ошибка при создании статьи:", err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}));
export const CreateArticleRouter = router;

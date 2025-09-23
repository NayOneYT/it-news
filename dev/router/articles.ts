import { Router } from "express";
import { Articles } from "../models/articles.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const getArticles = await Articles.find().sort({published: -1})
        if (!getArticles) throw new Error("No items")
        res.status(200).send(getArticles)
    }
    catch(err) {
        console.log(err)
        res.status(500)
    }
})

router.get("/:id", async (req, res) => {
  try {
    const article = await Articles.findById(req.params.id);
    res.status(200).send(article);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Ошибка сервера" });
  }
});

export const ArticlesRouter = router
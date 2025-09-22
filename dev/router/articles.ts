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

export const ArticlesRouter = router
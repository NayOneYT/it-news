import { Router } from "express";
import { Comments } from "../models/comments.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const article_id = req.query.article_id
        const query = article_id ? { article_id } : {}
        const getComments = await Comments.find(query).sort({published: -1})
        if (!getComments) throw new Error("No items")
        res.status(200).send(getComments)
    }
    catch(err) {
        console.error(err)
        res.status(500).send({ message: "Ошибка сервера" })
    }
})

router.post("/", async (req, res) => {
  try {
    const name = req.body.name
    const text = req.body.text
    const article_id = req.body.article_id
    const newComment = new Comments({
      name: name,
      text: text,
      article_id: article_id
    })
    const saveComment = await newComment.save();
    res.status(201).send(saveComment);
  }
  catch (err) {
    console.error(err);
    res.status(500).send({ message: "Ошибка сервера" })
  }
})

export const CommentsRouter = router
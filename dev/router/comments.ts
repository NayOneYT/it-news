import { Router } from "express";
import type { Request, Response, NextFunction } from "express"
import { Comments } from "../models/comments.js"
import jwt from "jsonwebtoken"

const router = Router()

function authAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: "Нет токена, авторизуйтесь" })
    }
    const token = authHeader.split(" ")[1]
    if (!token) {
      return res.status(401).json({ message: "Неверный формат заголовка Authorization" })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    ;(req as any).admin = decoded
    next()
  } 
  catch (err) {
    return res.status(401).json({ message: "Неверный или просроченный токен" })
  }
}

router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const id = req.params.id
    await Comments.deleteOne({ article_id: id })
    res.status(200).send({ message: "Комментарий удален" })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: "Ошибка сервера" })
  }
})

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
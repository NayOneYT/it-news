import { Router } from "express"
import type { Request, Response, NextFunction } from "express"
import { Articles } from "../models/articles.js"
import { Comments } from "../models/comments.js"
import jwt from "jsonwebtoken"
import multer from 'multer'
import { storage, cloudinary } from "../utils/cloudinary.js"

const router = Router()
const upload = multer({ storage })

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

router.get("/moderation", authAdmin, async (req, res) => {
  try {
    const getArticles = await Articles.find({ status: "moderation" }).sort({published: -1})
    res.status(200).send(getArticles)
  }
  catch (err) {
    console.log(err)
    res.status(500)
  }
})

router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const id = req.params.id
    const article = await Articles.findById(id)
    if (!article) {
      return res.status(404).send({ message: "Статья не найдена" })
    }
    if (article.img && !article.img.includes('/img/no-image.jpg')) {
      try {
        const urlParts = article.img.split('/')
        const uploadIndex = urlParts.indexOf('upload')
        const publicIdWithVersion = urlParts.slice(uploadIndex + 2).join('/')
        const publicId = publicIdWithVersion.replace(/\.[^/.]+$/, "")
        await cloudinary.uploader.destroy(publicId)
      } 
      catch (cloudinaryErr) {
        console.error(cloudinaryErr.message)
      }
    }
    await Articles.findByIdAndDelete(id)
    await Comments.deleteMany({ article_id: id })
    res.status(200).send({ message: "Статья удалена" })
  } 
  catch (err) {
    console.error(err)
    res.status(500).send({ message: "Ошибка сервера" })
  }
})

router.patch("/approve/:id", authAdmin, async (req, res) => {
  try {
    const id = req.params.id
    const article = await Articles.findById(id)
    if (!article) {
      return res.status(404).send({ message: "Статья не найдена" })
    }
    await Articles.updateOne({_id: id}, {$set: {status: "approved"}})
    res.status(200).send({ message: "Статья одобрена" })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: "Ошибка сервера" })
  }
})

router.post("/create-by-admin", authAdmin, upload.single('img'), async (req, res) => {
  try {
    const title = req.body.title
    const anons = req.body.anons
    const full_text = req.body.full_text
    const article = new Articles({
      title,
      anons,
      full_text,
      status: "approved",
      img: req.file ? (req.file as any).path : "/img/no-image.jpg"
    })
    const savedArticle = await article.save()
    res.status(201).send({ savedArticle })
  } 
  catch (err) {
    console.error(err)
    res.status(500).send({ message: "Ошибка сервера" })
  }
})

router.get("/", async (req, res) => {
  try {
    const getArticles = await Articles.find().sort({published: -1})
    res.status(200).send(getArticles)
  }
  catch(err) {
    console.log(err)
    res.status(500)
  }
})

router.get("/approved", async (req, res) => {
  try {
    const getArticles = await Articles.find({ status: "approved" }).sort({published: -1})
    res.status(200).send(getArticles)
  }
  catch(err) {
    console.log(err)
    res.status(500)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const article = await Articles.findById(req.params.id)
    res.status(200).send(article)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: "Ошибка сервера" })
  }
})

router.post("/create-by-user", upload.single('img'), async (req, res) => {
  try {
    const title = req.body.title
    const anons = req.body.anons
    const full_text = req.body.full_text
    const article = new Articles({
      title,
      anons,
      full_text,
      img: req.file ? (req.file as any).path : "/img/no-image.jpg"
    })
    await article.save()
    res.status(201).send({ message: "Статья отправлена на модерацию" })
  } 
  catch (err) {
    console.error(err)
    res.status(500).send({ message: "Ошибка сервера" })
  }
})

export const ArticlesRouter = router
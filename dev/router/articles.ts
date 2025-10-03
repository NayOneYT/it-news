import { Router } from "express"
import type { Request, Response, NextFunction } from "express"
import { Articles } from "../models/articles.js"
import { Comments } from "../models/comments.js"
import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"
import multer from 'multer'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

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
    if (article.img != "/img/no-image.jpg") {
      const imgPath = path.resolve("public/public", "." + article.img)
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath)
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
      status: "approved"
    })
    const savedArticle = await article.save()
    if (req.file) {
      const ext = path.extname(req.file.originalname)
      const imgPath = path.resolve('public/public/img')
      const fileName = `${savedArticle._id}${ext}`
      const fullPath = path.join(imgPath, fileName)
      fs.mkdirSync(imgPath, { recursive: true })
      fs.writeFileSync(fullPath, req.file.buffer)
      savedArticle.img = `/img/${fileName}`
      await savedArticle.save()
    }
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
      full_text
    })
    const savedArticle = await article.save()
    if (req.file) {
      const ext = path.extname(req.file.originalname)
      const imgPath = path.resolve('public/public/img')
      const fileName = `${savedArticle._id}${ext}`
      const fullPath = path.join(imgPath, fileName)
      fs.mkdirSync(imgPath, { recursive: true })
      fs.writeFileSync(fullPath, req.file.buffer)
      savedArticle.img = `/img/${fileName}`
      await savedArticle.save()
    }
    res.status(201).send({ message: "Статья отправлена на модерацию" })
  } 
  catch (err) {
    console.error(err)
    res.status(500).send({ message: "Ошибка сервера" })
  }
})

export const ArticlesRouter = router
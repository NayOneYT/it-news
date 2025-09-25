import { Router } from "express"
import { Articles } from "../models/articles.js"
import path from "path"
import fs from "fs"
import multer from 'multer'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post("/", upload.single('img'), async (req, res) => {
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

export const CreateArticleRouter = router
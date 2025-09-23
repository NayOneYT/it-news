import express from "express"
import { connect } from "mongoose"
import { MONGODB_URL, PORT } from "./config.js"
import { ArticlesRouter } from "./router/articles.js"
import { CommentsRouter } from "./router/comments.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api/articles", ArticlesRouter)
app.use("/api/comments", CommentsRouter)

connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Успешное подключение к БД. Сервер запущен на http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('Ошибка подключения к БД:', err)
  }
)
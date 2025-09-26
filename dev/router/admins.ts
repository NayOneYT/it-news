import { Router } from "express"
import type { Request, Response, NextFunction } from "express"
import { Articles } from "../models/articles.js"
import { Admins } from "../models/admins.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = Router()

router.post("/login", async (req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password
        const admin = await Admins.findOne({ login: login })
        if (!admin) {
            return res.status(401).send({ message: "Неверный логин или пароль" })
        }
        const isPassValid = await bcrypt.compare(password, admin.password)
        if (!isPassValid) {
            return res.status(401).send({ message: "Неверный логин или пароль" })
        }
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "12h" }
        )
        res.status(200).send({ token })
    } 
    catch (err) {
        res.status(500).json({ message: "Ошибка сервера" })
    }
})

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
        if (getArticles.length == 0) throw new Error("No items")
        res.status(200).send({ getArticles })
    }
    catch (err) {
        console.log(err)
    res.status(500)
    }
})

router.get("/approved", authAdmin, async (req, res) => {
    try {
        const getArticles = await Articles.find({ status: "approved" }).sort({published: -1})
        if (getArticles.length == 0) throw new Error("No items")
        res.status(200).send({ getArticles })
    }
    catch (err) {
        console.log(err)
        res.status(500)
    }
})

export const AdminsRouter = router
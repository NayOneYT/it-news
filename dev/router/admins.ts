import { Router } from "express"
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
            return res.status(401).send({ error: true })
        }
        const isPassValid = await bcrypt.compare(password, admin.password)
        if (!isPassValid) {
            return res.status(401).send({ error: true })
        }
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "12h" }
        )
        res.status(200).send({ token })
    } 
    catch (err) {
        res.status(500)
    }
})

export const AdminsRouter = router
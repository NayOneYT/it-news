var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { Admins } from "../models/admins.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = req.body.login;
        const password = req.body.password;
        const admin = yield Admins.findOne({ login: login });
        if (!admin) {
            return res.status(401).send({ error: true });
        }
        const isPassValid = yield bcrypt.compare(password, admin.password);
        if (!isPassValid) {
            return res.status(401).send({ error: true });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "12h" });
        res.status(200).send({ token });
    }
    catch (err) {
        res.status(500);
    }
}));
export const AdminsRouter = router;

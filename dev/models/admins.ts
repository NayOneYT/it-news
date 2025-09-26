import { Schema, model } from "mongoose"

const admins = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export const Admins = model("admins", admins)
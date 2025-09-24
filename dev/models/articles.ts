import { Schema, model } from "mongoose"

const articles = new Schema({
    title: {
        type: String,
        required: true
    },
    anons: {
        type: String,
        required: true
    },
    full_text: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
        default: "/img/no-image.jpg"
    },
    published: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: false,
        default: "moderation"
    }
})

export const Articles = model("articles", articles)
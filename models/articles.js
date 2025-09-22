import { Schema, model } from "mongoose";
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
        default: ""
    },
    published: {
        type: Date,
        required: true,
        default: Date.now
    }
});
export const Articles = model("articles", articles);

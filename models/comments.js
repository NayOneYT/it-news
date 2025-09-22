import { Schema, model } from "mongoose";
const comments = new Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    article_id: {
        type: String,
        required: true
    },
    published: {
        type: Date,
        required: true,
        default: Date.now
    }
});
export const Comments = model("comments", comments);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const commentSchema = new Schema({
  comment: String,
  date: { type: Date, default: new Date() },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

const postSchema = new Schema({
  title: String,
  description: String,
  comments: [commentSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Post", postSchema);

const express = require("express");

const app = express();
const PORT = 8080;

const bodyParser = require('body-parser');
 // ...below const app = express()
app.use(bodyParser.json());
// we can now send requests whose body is JSON

const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/blog";
mongoose.connect(uri);

const Post = require("../models/post");

app.get("/posts", (req, res) => {
  Post.find()
    .populate("user")
    .populate("comments.user") // <-- add this line
    .then(docs => {
      res.status(200).json({
        message: "success",
        payload: docs
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

app.post("/post", (req, res) => {
  const { title, description, user } = req.body;
  const post = new Post({
    title,
    description,
    user
  });

  post.save().then(doc => {
    res
      .status(200)
      .json({
        message: "post saved",
        payload: doc
      })
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
});

app.post("/comment/:post_id", (req, res) => {
  const { post_id } = req.params;
  const { description, user } = req.body;
  const newComment = { comment: description, user };
  Post.findById(post_id)
    .then(doc => {
      doc.comments.push(newComment);
      return doc.save();
    })
    .then(doc => {
      res.status(200).send({ message: "comment added", payload: doc });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

app.delete("/post/:post_id", (req, res) => {
  const id = req.params.post_id;
  Post.findByIdAndRemove(id)
    .then(doc => {
      res.status(202).json({
        message: "removed",
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

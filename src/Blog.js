import React, { Component } from "react";
import axios from "axios";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost"

class Blog extends Component {
  state = {
      // our blog posts will be stored here eventually
      posts: []
  };

  refresh = () => {
    // get all block posts from the backend
    axios.get("/posts").then(res => {
      const data = res.data;
      // if blog posts come back
      if (data.payload) {
        // store them in state
        this.setState({ posts: data.payload });
      }
    });
  };

  componentDidMount() {
    // on component mount, get all blog posts
    this.refresh();
  }

  deletePost = id => {
    axios.delete(`/post/${id}`).then(this.refresh);
  };

  render() {
    return (
      <div>
        <CreatePost refresh={this.refresh} />

        <div className="posts">
          {this.state.posts.map(post => (
            <Post key={post._id} {...post} deletePost={this.deletePost} />
          ))}
        </div>
      </div>
    );
  }
}

export default Blog;

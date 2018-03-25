import React, { Component } from "react";
import axios from "axios";

class CreatePost extends Component {
  state = {
    title: "",
    description: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, description } = this.state;
    axios
      .post("/post", {
        title,
        description,
        user: "5aa58fe20dda5b30cf4d097f"
      })
      .then(this.props.refresh);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Create a New Post</h2>
        <div>
          <input
            onChange={this.handleChange}
            name="title"
            type="text"
            placeholder="Enter the post title"
          />
        </div>
        <div>
          <textarea
            onChange={this.handleChange}
            name="description"
            placeholder="Enter the post description"
          />
        </div>
        <input type="submit" value="Add Post" />
      </form>
    );
  }
}

export default CreatePost;

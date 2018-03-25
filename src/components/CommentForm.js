import React, { Component } from "react";
import axios from "axios";

class CommentForm extends Component {
  state = {
    description: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`/comment/${this.props._id}`, {
        description: this.state.description,
        user: "5aa58fe20dda5b30cf4d097f"
      })
      .then(this.props.refresh);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <textarea
            name="description"
            placeholder="Enter your comment"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input type="submit" value="Submit Comment" />
        </div>
      </form>
    );
  }
}

export default CommentForm;

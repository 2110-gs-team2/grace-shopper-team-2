import React, { Component } from "react";
import { Link } from "react-router-dom";

/*
To test, enter this url:
http://localhost:8080/testqs
*/

class Test_SetQueryStrings extends Component {
  constructor() {
    super();
    this.state = {
      type: "indoor",
      difficulty: "beginners",
      size: "small"
    };
  }

  componentDidMount() {
    this.setState({ isPetFriendly: true });
  }

  render() {
    const queryString = Object.keys(this.state)
      .map((key) => key + "=" + this.state[key])
      .join("&");
    return (
      <div className="py-20 px-5">
        <Link to={`/test?${queryString}`}>Click to test</Link>
      </div>
    );
  }
}

export default Test_SetQueryStrings;

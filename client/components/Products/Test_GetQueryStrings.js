import React, { Component } from "react";
import queryString from "query-string"; // This library will help parse the query

class Test_GetQueryStrings extends Component {
  componentDidMount() {
    console.log(this.props.location.search);
    // "type=indoor&difficulty=beginners&size=small&isPetFriendly=true"

    const values = queryString.parse(this.props.location.search);
    console.log(values, "VALUES");
    /*
    {
      type: "indoor",
      difficulty: "beginners",
      size: "small",
      isPetFriendly: "true"
    }
    */

    for (const [key, value] of Object.entries(values)) {
      console.log(`${key}: ${value}`);
    }
  }

  render() {
    return <div className="py-20 px-5">Testing...see console</div>;
  }
}

export default Test_GetQueryStrings;

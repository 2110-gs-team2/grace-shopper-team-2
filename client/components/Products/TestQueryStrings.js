import React, { Component } from "react";
import queryString from "query-string"; // This library will help parse the query

/*
To test, enter this url and look at the console:
http://localhost:8080/test?filter=active&type=indoor&difficulty=beginners&size=small
*/

class TestQueryStrings extends Component {
  componentDidMount() {
    console.log(this.props.location.search);
    // "filter=active&type=indoor&difficulty=beginners&size=small"

    const values = queryString.parse(this.props.location.search);
    console.log(values.filter); // "active"
    console.log(values.type); // "indoor"
    console.log(values.difficulty); // "beginners"
    console.log(values.size); // "small"
  }

  render() {
    return (
      <div className="py-20 px-5">Testing parsing query strings...</div>
    );
  }
}

export default TestQueryStrings;

// Next step is to figure out how to append these query strings to the url

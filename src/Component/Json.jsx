import React, { Component } from 'react';

export default class Json extends Component {
  constructor(props) {
    super(props);

    let data = `{
      "name": "ankit",
      "age": 20,
      "place": "rewa",
      "is_student": true,
      "p_lang": ["c", "c++", "python"]
    }`;
    this.objdata = JSON.parse(data);
  }
  render() {

    return (
      <div>
        <h1>JSON Parse data </h1>
           <p>Name: {this.objdata.name}</p>
          <p>Place: {this.objdata.place}</p>
          <p>Age: {this.objdata.age}</p> 
          <p>programming language :{this.objdata.p_lang[2]}</p>
        
        
      </div>
    );
  }
}



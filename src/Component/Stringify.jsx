import React, { Component } from 'react';

class Json extends Component {
  constructor(props) {
    super(props);
    let student = {
      name: "ankit",
      age: 25,
      city: "rewa",
    };
    this.data = JSON.stringify(student); 
  }

  render() {
    const student = JSON.parse(this.data); 
    return (
      <div>
        <h1>Student Information</h1>
        <p>Name: {student.name}</p>
        <p>Age: {student.age}</p>
        <p>City: {student.city}</p>
      </div>
    );
  }
}

export default Json;

import React, { Component } from 'react'

type ForgetPass={
    email:String;
    password:number;
    phone:number;
  
};
type State={
    forget:ForgetPass;
    submitted:boolean;

}
export default class ForgetPassword extends Component {
  render() {
    return (
      <div className='h-'>
        <h1>Forget password</h1>
        <input type="text" />
        <button>submit</button>
      </div>
    )
  }
}

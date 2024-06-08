import React, { Component } from 'react'
import Local from './Component/Local'
import Json from './Component/Json'
import Stringify from './Component/Stringify'


export default class App extends Component {
  render() {
    return (
      <div>
        {/* <Local/> */}
        <Json/>
        <Stringify/>
      </div>
    )
  }
}

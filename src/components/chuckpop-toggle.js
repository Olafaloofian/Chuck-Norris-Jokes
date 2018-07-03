import React, { Component } from 'react'
import "../App.css"
import Popup from "./chuckpop"

export default class PopupToggle extends Component {
    constructor () {
        super();
        this.state= {
            showPopup: false
        }
    }
    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }
    render () {
        return(
            <div>
                <button id='togglebutton' onClick={this.togglePopup}>DON'T CLICK ME</button>
                {this.state.showPopup && <Popup text="Yum... Chuck Norris." closePopup={this.togglePopup}/>}
            </div>
        )
    }
}
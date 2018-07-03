import React from 'react'
import "../App.css"
import "./title.css"

export default function Title (props) {
        return(
            <div id='title'>{props.text}</div>
        )
}
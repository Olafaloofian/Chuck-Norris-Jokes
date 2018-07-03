import React from 'react'
import "./chuckpop.css"


export default function Popup (props) {
    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="popper"><img src="http://s15739.pcdn.co/wp-content/uploads/2017/05/lead2-Chuck-Norris-as-Cordell-Walker.jpg" alt="Chuck Norriz" onClick={props.closePopup}/></div>
            </div>
        </div>
    )
}

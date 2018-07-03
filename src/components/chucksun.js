import React, { Component } from  'react';
import axios from 'axios'
import "./chucksun.css"

export default class Sun extends Component {
    constructor () {
        super();

        this.state = {
            sunriseData: "",
            sunsetData: "",
        }
    }
    componentDidMount() {
        console.log('Sun component mounted!')
        axios.get('https://api.sunrise-sunset.org/json?lat=30.387985&lng=-96.087738&date=today').then(res => {
            console.log('Sun api response', res)
            console.log('sundata', res.data.results.sunrise)
            this.setState({
                sunriseData: res.data.results.sunrise,
                sunsetData: res.data.results.sunset,
            })
            this.convertTime()
        })
    }
    convertTime() {
        const splitSunrise = this.state.sunriseData.split(":")
        const splitSunset = this.state.sunsetData.split(":")
        let sunrise = (this.state.sunriseData.split(":")[0])-7
        let sunset = Math.abs((this.state.sunsetData.split(":")[0])-7)
        const newSunrise = sunrise + ':' + splitSunrise[1] + " AM"
        const newSunset = sunset + ':' + splitSunset[1] + " PM"
    //    console.log('splitSunset[2]', splitSunset[2].split(" "))
        this.setState({
            sunriseData: newSunrise,
            sunsetData: newSunset
        })
    }
    render () {
        // console.log('this.state.sunriseData.split', this.state.sunriseData.split(":")[1]="PM")
        console.log('this.state.sunData', this.state.sunData)
        return(
            <div>
                <div><img src="https://sunrise-sunset.org/sunrise-100px.svg" alt="Sunrise"/></div>
                <div className='bottom'>The sun rises over Chuck Norris at: {this.state.sunriseData}</div>
                <div><img src="https://sunrise-sunset.org/sunset-100px.svg" alt="Sunset"/></div>
                <div className='bottom'>The sun sets over Chuck Norris at: {this.state.sunsetData}</div>
            </div>
        )
    }
}
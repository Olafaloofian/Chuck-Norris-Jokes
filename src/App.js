import React, { Component } from 'react';
import './App.css';
import axios from'axios';
import url from './api'
import PopupToggle from "./components/chuckpop-toggle"
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed';
import Sun from "./components/chucksun"
import Title from "./components/title"

class App extends Component {
  constructor() {
    super();

    this.state = { //Object for holding Chuck Norris jokes and saved jokes
      jokes: "",
      savedJokes: [],
      deleteNumber: 1,
      newNumber: "",
      editValue: ""
    }
  }

  componentDidMount() { //Generating random Chuck Norris fact on page load
    console.log('Main Componenet Mounted!')
    axios.get('https://api.chucknorris.io/jokes/random').then(res => {
      console.log('chucknorris.io response: ', res)
      this.setState({
        jokes: res.data.value
      })
    })
    axios.get(url).then(res => {
      this.setState({
        savedJokes: res.data
      })
    })
    console.log(this.state.jokes)
  }

  newFact = () => { //Generating new Chuck Norris fact from external API
    axios.get('https://api.chucknorris.io/jokes/random').then(res => {
      this.setState({
        jokes: res.data.value
      })
    })
  }

  saveFact = () => { //Sending joke to internal API url
    axios.post(url, {value: this.state.jokes}).then(res => {
      console.log('Internal API response: ', res)
      this.setState({
        savedJokes: res.data,
      })
      console.log('savedJokes: ', this.state.savedJokes)
    })
  }

  deleteFact = (id) => { //Deleting saved Chuck Norris fact by ID
    axios.delete(`${url}/?id=${id}`).then(res => {
      console.log(res)
      this.setState({
        savedJokes: res.data
      })
    })
  }

  changeNumber = (e) => { //Number tool for choosing which Chuck Norris fact to delete
    this.setState({
      deleteNumber: e
    })
  }

  newNumber = (e) => { //Number tool for choosing which Chuck Norris fact to edit
    this.setState({
      newNumber: e
    })
  }

  editBox = (val) => { //Input box for making edits
    this.setState({
      editValue: val
    })
  }

  editText = (str, num) => { //Sending edits to backend internal API
    axios.put(url, {joke: str, id: num}).then(res => {
      console.log(res)
      this.setState({
        savedJokes: res.data,
        editValue: ""
      })
    })
  }
  

  render() {
    console.log('newNumber: ', this.state.newNumber)

    return (
      <div className="App">
      <header className="header-container">
        <div className="header-center">
          <span className="header-logo"></span>
          <span className="header-text">I ❤️ Chuck Norris</span>
        </div>
      </header>
      <main className="main-container">
        <div className="main-center">
            <div className="main-left">
              <Title text='From the man himself!' />
            <div className="twitter" >
              <TwitterTimelineEmbed sourceType="profile" screenName="chucknorris" options={{height: 550, width: 700}}/>
            </div>
              <TwitterFollowButton screenName={'chucknorris'} />
          </div>
        <div className="main-middle">
          <div className="main-top">
            <div className="random-joke"><div className="fact">{this.state.jokes}</div>
              <div><button className="newfact" onClick={this.newFact}> Get new Chuck Norris fact! </button></div>
              <div><button onClick={this.saveFact}> Save this fact! </button></div>
            </div>
          </div>  
          <div className="main-lower"> <div className='main-lower-title'>
          Saved Facts</div>
            <div><hr className="line"/></div>
            <div>
              {this.state.savedJokes.length === 1 ? <div className='saved'>{1}: {this.state.savedJokes[0].joke}</div>
              :
              this.state.savedJokes.map((e, i) => <div className='saved' key={i}>{i + 1}: {e.joke}</div>
              )}</div>
            <div className='delete'>Delete fact number: <input type='number' min="1" onChange={(e)=>this.changeNumber(e.target.value)}/>
            <button onClick={()=>this.deleteFact(this.state.deleteNumber)}>Delete</button></div>
            <div>Modify fact number: <input type='number' min="1" onChange={(e)=>this.newNumber(e.target.value)}/>
                  <div className='edit'><div className='edittext'>Edit fact text: </div>
                  <textarea type='text' onChange={(e)=>this.editBox(e.target.value)} placeholder={this.state.newNumber==="" || this.state.savedJokes.length<this.state.newNumber ? "" : this.state.savedJokes[(this.state.newNumber-1)].joke}/>
                  <button className="togglebutton" onClick={()=>this.editText(this.state.editValue, this.state.newNumber)}>Submit</button></div>
                </div>
          </div>
        </div>
        <div className="main-right">
              <Title text='📍 Navasota, TX' />
                <div className='suncontainer'><Sun /></div>
        </div>
        </div>
      </main>
      <footer className="footer-container">
              <div className="popup"> <PopupToggle/> </div>
      </footer>
      </div>
    );
  }
}

export default App;

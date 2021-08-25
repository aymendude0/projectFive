import React, { Component } from 'react';
import firebase from './firebase';
import AboutMe from './AboutMe';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      facts: "",
      userValue: "",
      showInfo: false,
      dataImage: "",
      showDotOne: "dotOne",
      showDotTwo: "dotTwo",
      showDotThree: "dotThree",
    }
  }



  getUserValue = (event) => {

    this.setState({userValue: event.target.value})

  }


  submitValue = (event) => {

    event.preventDefault();
    this.setState({
      facts: "",
      dataImage: ""
    })
    
    if (this.state.userValue === "") {
      alert("No value for this year, please enter a year between 1800 - 1909");
      return;
    }

    if ( isNaN(this.state.userValue)) {
      alert("Please input a number value - check the how to use section for further information");
      return;
    }

    const d = new Date().getFullYear();

    if ( parseInt(this.state.userValue) < 1800 || parseInt(this.state.userValue) > d ) {
      alert("No data currently available for this year. Please input a year between 1800 - 1909");
      return;
    }


    const dbRef = firebase.database().ref(this.state.userValue);

    const dbImageRef = firebase.database().ref('images');


    const imageGrab = dbImageRef.child(this.state.userValue);
    
    
    imageGrab.on('value', (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val() != null) {
        this.setState({
          dataImage: snapshot.val()}) 
        }
      })
        
    dbRef.on('value', (snapshot) => {
    

      let data = snapshot.val();

      
      if (data === null) {
        data="No current data on this year, check back later!"
      }

      this.setState({
        facts: data
      })
    })

    console.log(this.state.dataImage);
  }

  bringInfo = (event) => {
    event.preventDefault()
    this.setState({
        showInfo: true,
        showDotOne: "",
        showDotTwo: "",
        showDotThree: "",
      })
  }

  hideInformation = (event) => {
    event.preventDefault()
    this.setState({
      showInfo: false,
      showDotOne: "dotOne",
      showDotTwo: "dotTwo",
      showDotThree: "dotThree",
    })
  }

  render() {

    const altText = `Image of year ${this.state.userValue}`

    return (
      
      <div className="App">

        {this.state.showInfo
        ?<AboutMe hideInfo = {this.hideInformation} />
        :null}
        <div className="mainPage">
          <h1>What happened <br/> in th<span>e</span> year<span className={this.state.showDotOne}>.</span><span className={this.state.showDotTwo}>.</span><span className={this.state.showDotThree}>.</span></h1>

          <form onSubmit={this.submitValue}>

            <label className="sr-only">
              Type in a year from 1800 - 1909
            </label>

            <input onChange={this.getUserValue} type="text" name="name" placeholder="Type in a year from 1800 - 1909" required></input>

            <button className="buttonClass">Submit</button>

          </form>
          <button className="buttonClass" onClick={this.bringInfo}>How to use</button>
          <div className="contentWrapper">
            <div style={{display: this.state.facts != "" ? 'block' : 'none' }} className="textDiv">
              <h2>In the year {this.state.userValue}<span className={this.state.showDotOne}>.</span><span className={this.state.showDotTwo}>.</span><span className={this.state.showDotThree}>.</span></h2>
              <div>
              <p style={{width: this.state.dataImage === "" ? '100%' : '50%' }}>{this.state.facts}</p>
              {this.state.dataImage === "" 
              ?null
              :<img src={this.state.dataImage} alt={altText} />}
              </div>
            </div>
          </div>


        </div>
          <footer>Created by Aymen Mahmod at Juno College</footer>
      </div>

    );
  }
}

export default App;

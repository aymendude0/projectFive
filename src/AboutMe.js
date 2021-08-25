import React, { Component } from 'react';




class AboutMe extends Component {
    render(props) {
        return (
            <div className="main">
                <div>
                    <h2>Instructions</h2>
                    <p>Type in a year from 1800 - 1909 to find major events that occured!</p>
                    <button className="buttonClass" onClick={this.props.hideInfo}>Close</button>
                </div>
            </div>
        )
    }
}



export default AboutMe;
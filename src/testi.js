import React, { Component } from 'react';
import './App.css';
import Kello from './DigitalWatch';
import AnalogWatch from './AnalogWatch';

class Testi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showkello: "hide"
        };
    }

    handleClickHelp = (event) => {
        let status = this.state.showkello;
        if (status === "show") {
            status = "hide"
        } else {
            status = "show"
        }
        this.setState({
            showkello: status
        })
    }

    render() {
        console.log(this.state.showhelp);
        if (this.state.showkello === "show") {
            return (
                <div className="Kello_page">

                    <button onClick={this.handleClickHelp}>DigitalWatch</button>
                    <div className="digital_tila">

                        <Kello kellonaika={this.state.time} />
                        <p>digi</p>
                    </div>
                </div>)
        } else {

            return (
                <div className="Kello_page">

                    <button onClick={this.handleClickHelp}>Normaalikello</button>
                    <div className="Kello_tila">

                        <p>Normi</p>
                       
                        <AnalogWatch />
                    </div>
                </div>
            );

        }
    }
}


export default Testi;
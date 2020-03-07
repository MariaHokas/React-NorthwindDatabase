import React, { Component } from 'react';
import './App.css';
import Clock from 'react-clock';




class AnalogWatch extends Component {
    constructor(props) {
        super(props);
        console.log("Constructorissa")
        this.state = {
            pvm: new Date()
        };
    }

    componentDidMount() {
     
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
        console.log("componentDidMount")
    }

    tick() {
        console.log("Tickissä")
        this.setState({
            pvm: new Date()
        });
    }

    componentWillUnmount() {   
        clearInterval(this.intervalID);
        console.log("ConponentWillUnmount")
    }
    render() {
        console.log("Render")
        return (
            <div className="Kello_page">

                <header className="Viestit-header">
                    <h1>Northwind React-ovellus</h1>
                </header>
     
                <div>
                    <div className="kello">
                        <Clock value={this.state.pvm} />
                    </div>
                </div>
            </div>
        );
    }
}


export default AnalogWatch;
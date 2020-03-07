import React, { Component } from 'react';
import './App.css';
import Clock from 'react-clock';


class Kello extends Component {
    render() {
        return (
            <h4>Kello on nyt: {this.props.kellonaika}</h4>
        );
    }
}


class DigitalWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            pvm: new Date()
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        this.setState({
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            pvm: new Date()
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div className="Kello_page">

                <header className="Viestit-header">
                    <h3>Kello-sovellusikkuna</h3>
                </header>
                <div className="digital_tila">
                    <p>Kellonaika: {this.state.time}</p>
                    <p>Päivämäärä: {this.state.date}</p>
                    <Kello kellonaika={this.state.time} />

                </div>
                <div className="Kello_tila">
                    <div className="kello">
                        <Clock value={this.state.pvm} />
                    </div>
                </div>
            </div>
        );
    }
}


export default DigitalWatch;
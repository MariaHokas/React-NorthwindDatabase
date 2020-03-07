import React, { Component } from 'react';
import './App.css';
import Helpit from './Helpit';
import Md5Salaus from './Md5Salaus';

class Viesti extends Component{
    render() {
        return(
            <p>
                Tässä on oma vakioviesti
            </p>
        );
    }
}

class Viestiprp extends Component{
    render() {
        console.log(this.props.automalli)
        return(
            <>
            <p>{this.props.viesti}</p>
            <p>{this.props.viesti2}</p>
            <p>{this.props.viesti3}</p>
            <p>{this.props.viesti4}</p>
            <p>{this.props.viesti5}</p>
            </>
        );
    }
}

class Viestit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showhelp: "hide"
        };
    }

    handleClickHelp = (event) => {
        let status = this.state.showhelp;
        if (status === "show") 
        {
            status="hide"
        } else {
            status="show"
        }
        this.setState({
            showhelp: status
        })
    }

    render() {
        console.log(this.state.showhelp);
        if (this.state.showhelp==="show") {
            return (
                <div className="viestit_page">
            <div className="Viestit">
                <header className="Viestit-header">
                    <h3>Viestit-sovellusikkuna</h3>
                </header>
                    <button onClick={this.handleClickHelp}>Piilota opaste</button>
                    <Helpit moduli="viestit"/>
                </div>
                </div>)
            } else {     

        return (<div className="viestit_page">
            <div className="Viestit">
                <header className="Viestit-header">
                    <h3>Viestit-sovellusikkuna</h3>
                </header>
                <button onClick={this.handleClickHelp}>Näytä opaste</button>
            </div>
            <div>
                <p>Tässä alapuolella luetellaan viestejä</p>
            </div>
            <Md5Salaus salattava="testi123" />
            <Viesti />
            <Viestiprp viesti="Viesti nro 1" viesti2="Viesti nro 2" />
            <Viestiprp viesti3="Viesti nro 3"/>
            <Viestiprp viesti4="Viesti nro 4"/>
            <Viestiprp viesti5="Viesti nro 5" automalli="V40"/>
            <Helpit moduli="viestit"/>
        </div>
        );

    }
    }
}


export default Viestit;
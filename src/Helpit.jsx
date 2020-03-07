import React, { Component } from 'react';
import './App.css';

class Helpit extends Component {
    render() {

   if (this.props.moduli === "viestit") {
            return (
                <div className="viestit_page">
                    <p>Minäpä kerron kerron miten viestejä käytetään</p>
                </div>
            );
        }
        else if (this.props.moduli === "AnalogWatch") {
            return (
                <div className="viestit_page">
                    <p>Minä kerron miten kello toimii</p>
                </div>
            );

        }
        else {
            return (
                <div>Helppiä ei löydy</div>
            );
        }
    }
       
}



export default Helpit;
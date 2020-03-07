import React, { Component } from 'react';
import App from './App';
import './App.css';

class OtsikkoApp extends Component {
    render() {
        return (
            <div className="block">
                <h1>
                    Marian React App!!! <App />
                </h1>
                
            </div>
        );
    }
}



class Otsikko extends Component {
    render() {
        return (<div className="Otsikko">
            <OtsikkoApp />

        </div>
        );
    }
}


export default Otsikko;
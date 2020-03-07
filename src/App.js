import React, {Component} from 'react';
// import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import Navigaatio from './Navigaatio';
import Footer from './Footer';

class App extends Component {
render() {
  return (
    <div>
      <BrowserRouter>
      <Navigaatio />   
    </BrowserRouter>
      <Footer />
    </div>
  );
}
}


export default App;

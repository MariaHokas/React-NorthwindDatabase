import React, { Component } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';


class Dropdown extends Component {
    // constructor(props) {
    //     super(props);
    //     console.log("TypicodeFetch: Constructor");
    //     this.state = {katekoriaTaulu: []}; //state-määrityksen voi tehdä yhdelle riville tai monelle
    //     //input-kentän onChange-kuuntelijan funktio sidotaan itseensä 
    //     this.handleChangeUserId = this.handleChangeUserId.bind(this);
    // }

    // componentDidMount() {
    //     console.log("TypicodeFetch: componentDidMount");
    //     this.HaeTypicodesta();
    // } 

   
    // handleChangeUserId(event) { 
    //     let arvo = event.target.value;
    //     this.setState({katekoria: arvo},this.handleSubmit);
    // }

    // handleSubmit(event) {
    //     console.log('TypicodeFetch: . . . . handleSubmitissa');
    //     this.HaeTypicodesta();
    // }

    // HaeTypicodesta() {
    //     //let uri = 'https://jsonplaceholder.typicode.com/katekoria'; //haku ilman rajoituksia
    //     let uri = 'https://localhost:5001/nw/products/c';

 
    //     console.log("HaeTypicodesta " + uri);
    //     fetch(uri)
    //         .then(response => response.json())
    //         .then(json => {
    //             console.log(json);
    //             this.setState({ katekoria: json});
    //         });
    // }

    // componentWillUnmount() {
    //     console.log("TypicodeFetch: componentWillUnmountssa");
    // }

    render() {
        // let viesti = "";
        // console.log("TypicodeFetch: renderissä");
        // let katekoriaTaulu = [];
        // if (this.state.katekoria.length > 0) {
        //   for (let index = 0; index < this.state.katekoria.length; index++) {
        //     const element = this.state.katekoria[index];
        //     katekoriaTaulu.push(<tr key={element.katekoria}>
        //       <td>{element.katekoria}</td>
        //     </tr>);
        //   }
        // }
        // else {
        //   viesti = "Ladataan tietoja Typicoden API:sta..."
        // }

        return (
        // <div className="box4">
        //     <h3>{viesti}</h3>
        //     <input type="text" placeholder="Limit with userId" value={this.state.ProductId} onChange={this.handleChangeUserId} /> 
<Table responsive>
  <thead>
    <tr>
      <th>#</th>
      <th>Table heading</th>
      <th>Table heading</th>
      <th>Table heading</th>
      <th>Table heading</th>
      <th>Table heading</th>
      <th>Table heading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
    </tr>
  </tbody>
</Table>
        // </div>
        );
        
    }
}
  

export default Dropdown;
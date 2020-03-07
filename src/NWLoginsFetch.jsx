import React, { Component } from 'react';
import Helpit from './Helpit';
import './App.css';
import NWLoginAdd from './NWLoginAdd';
import NWLoginEdit from './NWLoginEdit';
import NWLoginDelete from './NWLoginDelete';
import Table from 'react-bootstrap/Table';

class NWLoginsFetch extends Component {

  constructor(props) {
    super(props);
    console.log("NWLoginsFetch-komponentti: constructor");
    this.state = { 
        tunnukset: [], 
        start: 0,
        take: 10,
        visible: "table",
        renderChildAdd: true,   
        renderChildEdit: true,
        renderChildDelete: true,
        yksitunnus: [], 
        poistatunnus: [], 
        LoginID: '',
        LoginID2Del: ''  
    }; 
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
  }

  handleChildUnmountAdd(){
    console.log("Ollaan NWLoginsFetch -handleChildUnmountAdd-rutiinissa - - - - - - ");
    this.setState({renderChildAdd: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountEdit(){
    console.log("Ollaan NWLoginsFetch -handleChildUnmountEdit-rutiinissa - - - - - - ");
    this.setState({renderChildEdit: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountDelete(){
    console.log("Ollaan NWLoginsFetch -handleChildUnmountDelete-rutiinissa - - - - - - ");
    this.setState({renderChildDelete: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleClickTable = () => {
    this.setState({visible: "table"})
  }

  handleClickAdd = () => {
    this.setState({visible: "addform", renderChildAdd: true})
  }

  handleClickHelp = () => {
    this.setState({visible: "help"})
  }

  handleClickPrev = () => {
    let startvalue = this.state.start;
    if (startvalue > 0) {
        startvalue = startvalue-10;
    }
    this.setState({start: startvalue},this.handleSubmit);
  }

  handleClickNext = () => {
    this.setState({start: this.state.start+10},this.handleSubmit);
  }

  handleSubmit() {
    console.log('HaeNWRestApista: . . . . handleSubmitissa');
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {
    let uri = 'https://localhost:5001/nw/logins/r?offset='+this.state.start+'&limit='+this.state.take;
    // let uri = 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/r?offset='+this.state.start+'&limit='+this.state.take;
    console.log("HaeOmaRestistä " + uri);
    fetch(uri)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        this.setState({ tunnukset: json }); //Viedään tulosjoukko (json) setState-komennolla tunnukset -olioon
    });
  }

  handleClickEdit = (dataObj, event) => {
    console.log("<<<<<<<<<<<<<handleClickEdit -- -- -- dataObj-tulostus>>>>", dataObj);
    //alert(event.type); //voidaan tutkia millainen React-eventti oli kyseessä (esim: "click")
    this.setState({
      yksitunnus: dataObj, 
      visible: "editform", 
      renderChildEdit: true
    })
  }
  handleClickDelete = (dataObj, event) => {
    //console.log:ssa voi konkatenoida tekstin ja datan pilkulla ja pitääkin, jos haluaa tulostaa objektin sisällön 
    console.log("<<<<<<<<<<<<<handleClickDelete -- -- -- Poistan tunnuksen>>>>", dataObj); 
    alert("Poistan tunnuksen: " + dataObj.loginId); //Alertissa konkatenointi tehdään plussalla + 
    this.setState({
      poistatunnus: dataObj, 
      visible: "deleteform", 
      renderChildDelete: true
    })
  }
 
  componentDidMount() {
    this.HaeNWRestApista();
  }

  render() {
    console.log("NWLoginsFetch-komponentti: render");
    let viesti = "NW Käyttäjä-rivejä: " + this.state.tunnukset.length;
    let taulukko = [];
    //Luodaan taulukon otsikot
    let tHeaders=<tr><th></th><th>ID</th><th>Nimi</th><th>Sähköposti</th><th>Salasana</th><th></th></tr>;
    if (this.state.tunnukset.length > 0) {
        for (let index = 0; index < this.state.tunnukset.length; index++) {
            const element = this.state.tunnukset[index];
            taulukko.push(<tr key={element.loginId}>
            <td><i className="fas fa-pencil-alt" onClick={this.handleClickEdit.bind(this, element)}></i></td>
            <td >{element.loginId}</td>
            <td>{element.firstname} {element.lastname}</td>
            <td>{element.email}</td>
            <td>{element.password}</td>
            <td><i className="fas fa-trash-alt" onClick={this.handleClickDelete.bind(this, element)}></i></td>
            </tr>);
      }
    }
    else {
      viesti = "Ladataan tietoja Northwind-tietokannasta..."
    }
    //Ehdollinen return
    if (this.state.visible==="table") {
      return (<div className="box4">
        <h1 className="text-center">Tietokantahaku tunnukset</h1>
        <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickAdd}>Lisää tunnus</button>
        <Table responsive="sm" className="table table-dark" id="t01">
              <thead>{tHeaders}</thead>
              <tbody>{taulukko}</tbody>
            </Table>
            <button  onClick={this.handleClickPrev}><i className="fas fa-angle-double-left"> Edelliset</i></button>
            <button onClick={this.handleClickNext}>Seuraavat <i className="fas fa-angle-double-right"></i></button>
        <p>{viesti}</p>
      </div>
    );
    } else if (this.state.visible==="addform") {
      return (<div className="box4">
        <h1 className="text-center">Uuden käyttäjän lisäys</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildAdd ? <NWLoginAdd unmountMe={this.handleChildUnmountAdd} /> : null }
      </div>
      );

    } else if (this.state.visible==="editform") {
      return (<div className="box4">
        <h1 className="text-center">Tuote tietojen muokkaus</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildEdit ? <NWLoginEdit tunnusObj={this.state.yksitunnus} unmountMe={this.handleChildUnmountEdit} /> : null }
      </div>
      );

    } else if (this.state.visible==="deleteform") {
      return (<div className="box4">
        <h1 className="text-center">tunnusstietojen poiston vahvistus</h1>
        <div className="text-center">
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildDelete ? <NWLoginDelete tunnusObj={this.state.poistatunnus} unmountMe={this.handleChildUnmountDelete} /> : null }
      </div>
      );

    } else if (this.state.visible==="help") {
      return (<div className="box1">
        <h1>Sovelluksen opasteet</h1>
        <button onClick={this.handleClickAdd}>Lisää tunnus</button>
        <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        <Helpit moduli="NWLoginsFetch"/>
      </div>
      );

    } else {
      return (<div className="box1">
        <h1>Sovellusvirhe - lataa sivu uudelleen!</h1>
      </div>
      );
    }
    

  }
}
export default NWLoginsFetch;
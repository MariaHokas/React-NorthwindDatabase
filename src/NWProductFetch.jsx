import React, { Component } from 'react';
import Helpit from './Helpit';
import './App.css';
import NWProductAdd from './NWProductAdd';
import NWProductEdit from './NWProductEdit';
import NWProductDelete from './NWProductDelete';
import Table from 'react-bootstrap/Table';

class NWProductFetch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tuotteet: [],
      start: 0,
      take: 10,
      visible: "table",
      renderChildAdd: true,
      renderChildEdit: true,
      renderChildDelete: true,
      Yksituote: [],
      poistatuote: [],
      productId: '',
      productId2Del: ''
    };
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
  }

  handleChildUnmountAdd() {
    this.setState({ renderChildAdd: false });
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountEdit() {
    this.setState({ renderChildEdit: false });
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountDelete() {
    this.setState({ renderChildDelete: false });
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleClickTable = () => {
    this.setState({ visible: "table" })
  }

  handleClickAdd = () => {
    this.setState({ visible: "addform", renderChildAdd: true })
  }

  handleClickHelp = () => {
    this.setState({ visible: "help" })
  }

  handleClickPrev = () => {
    let startvalue = this.state.start;
    if (startvalue > 0) {
      startvalue = startvalue - 10;
    }
    this.setState({ start: startvalue }, this.handleSubmit);
  }

  handleClickNext = () => {
    this.setState({ start: this.state.start + 10 }, this.handleSubmit);
  }

  handleSubmit() {
    console.log('HaeNWRestApista: . . . . handleSubmitissa');
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {

    let uri = 'https://localhost:5001/nw/products/c?offset='+this.state.start+'&limit='+this.state.take;
    // let uri = 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/products/r?offset='+this.state.start+'&limit='+this.state.take;
    console.log("HaeOmaRestistä " + uri);
    fetch(uri)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ tuotteet: json }); //Viedään tulosjoukko (json) setState-komennolla tuotteet -olioon
      });
  }

  handleClickEdit = (dataObj, event) => {
    console.log("<<<<<<<<<<<<<handleClickEdit -- -- -- dataObj-tulostus>>>>", dataObj);
    //alert(event.type); //voidaan tutkia millainen React-eventti oli kyseessä (esim: "click")
    this.setState({
      Yksituote: dataObj,
      visible: "editform",
      renderChildEdit: true
    })
  }
  handleClickDelete = (dataObj, event) => {
    //console.log:ssa voi konkatenoida tekstin ja datan pilkulla ja pitääkin, jos haluaa tulostaa objektin sisällön 
    console.log("<<<<<<<<<<<<<handleClickDelete -- -- -- Poistan asiakkaan>>>>", dataObj);
    alert("Poistan asiakkaan: " + dataObj.productId); //Alertissa konkatenointi tehdään plussalla + 
    this.setState({
      poistatuote: dataObj,
      visible: "deleteform",
      renderChildDelete: true
    })
  }

  componentDidMount() {
    this.HaeNWRestApista();
  }

  render() {
    console.log("NWproductFetch-komponentti: render");
    let viesti = "NW products-rivejä:" + this.state.tuotteet.length;
    let taulukko = [];
    //Luodaan taulukon otsikot
    let tHeaders = <tr><th></th><th>Tuotteen nimi</th><th>Kategoria</th><th>Tuote poistettu</th><th></th></tr>;
    if (this.state.tuotteet.length > 0) {
      for (let index = 0; index < this.state.tuotteet.length; index++) {
        const element = this.state.tuotteet[index];
        let discontinued = JSON.stringify(element.discontinued);
        if (discontinued === "true") {
          discontinued = "kyllä"
        }
        else {
          discontinued = "Ei"
        }
        taulukko.push(
          <tr key={element.productId}>
          <td><i className="fas fa-pencil-alt" onClick={this.handleClickEdit.bind(this, element)}></i></td>
          <td>{element.productName}</td>
          <td>{element.kategoria}</td>
          <td>{discontinued}</td>
          <td><i className="fas fa-trash-alt" onClick={this.handleClickDelete.bind(this, element)}></i></td>
        </tr>
        );
      }
    }

    else {
      viesti = "Ladataan tietoja Northwind-tietokannasta..."
    }
    //Ehdollinen return
    if (this.state.visible === "table") {
      return (
       
          <div className="box4">
            <h1 className="text-center">Tietokantahaku tuotteet</h1>
            <button onClick={this.handleClickHelp}>Näytä opaste</button>
            <button onClick={this.handleClickAdd}>Lisää tuote</button>
            <Table responsive="sm" className="table table-dark" id="t01">
              <thead>{tHeaders}</thead>
              <tbody>{taulukko}</tbody>
            </Table>           
            <button  onClick={this.handleClickPrev}><i className="fas fa-angle-double-left"> Edelliset</i></button>
            <button onClick={this.handleClickNext}>Seuraavat <i className="fas fa-angle-double-right"></i></button>
            <p>{viesti}</p>
          </div>
        
      );
    } else if (this.state.visible === "addform") {
      return (<div className="box4">
        <h1 className="text-center">Uuden tuotteen lisäys</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa tuotteita</button>
        </div>
        {this.state.renderChildAdd ? <NWProductAdd unmountMe={this.handleChildUnmountAdd} /> : null}
      </div>
      );

    } else if (this.state.visible === "editform") {
      return (<div className="box4">
        <h1 className="text-center">Tuote tietojen muokkaus</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildEdit ? <NWProductEdit tuoteObj={this.state.Yksituote} unmountMe={this.handleChildUnmountEdit} /> : null}
        {/* {this.state.renderChildEdit ? <RadioButton tuoteObj={this.state.Yksituote} unmountMe={this.handleChildUnmountEdit} /> : null } */}
      </div>
      );

    } else if (this.state.visible === "deleteform") {
      return (<div className="box4">
        <h1 className="text-center">tuotetietojen poiston vahvistus</h1>
        <div className="text-center">
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildDelete ? <NWProductDelete tuoteObj={this.state.poistatuote} unmountMe={this.handleChildUnmountDelete} /> : null}
      </div>
      );

    } else if (this.state.visible === "help") {
      return (<div className="box1">
        <h4 className="text-center">Sovelluksen opasteet</h4>
        <div>
          <button onClick={this.handleClickAdd}>Lisää tuote</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
          <Helpit moduli="NWproductFetch" />
        </div>
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
export default NWProductFetch;


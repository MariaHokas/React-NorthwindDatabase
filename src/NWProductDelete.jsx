import React, { Component } from 'react';
import './App.css';


class NWProductDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {tuoteObj: [], ProductID: '',  ProductName: '', SupplierId: '', UnitsOnOrder: '', Discontinued: ''};
        this.handleChangeProductID = this.handleChangeProductID.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeSupplierID = this.handleChangeSupplierID.bind(this);
        this.handleChangeUnitsOnOrder = this.handleChangeUnitsOnOrder.bind(this);
        this.handleChangeDiscontinued = this.handleChangeDiscontinued.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePerformDelete = this.handlePerformDelete.bind(this);
      } 
      dismiss() {
          console.log("Ollaan NWCustomerDelete -dismiss()-rutiinissa - - - - - - ");
          this.props.unmountMe();
      } 
      handleChangeProductID(event) { 
          var syöte = event.target.value;
          this.setState({...this.state,ProductID: syöte.toUpperCase()});
      }
      handleChangeProductName(event) { 
          var syöte = event.target.value;
          this.setState({...this.state,ProductName: syöte});
      }  
      handleChangeSupplierID(event) {
          var syöte = event.target.value;
          this.setState({...this.state,SupplierID: syöte});
      }
      handleChangeUnitsOnOrder(event) {
          var syöte = event.target.value;
          this.setState({...this.state,UnitsOnOrder: syöte});
      }
      handleChangeDiscontinued(event) {
          var syöte = event.target.value;
          this.setState({...this.state,Discontinued: syöte});
      }
      handleSubmit(event) {
          alert('Päivitettävä tuote: ' + this.state.ProductID);
          event.preventDefault();
          this.InsertoiKantaan();
      }
  
      callBackRoutine() {
          console.log('NWCustomerDelete: . . . . callBackRoutine >>>---' + this.state.tuoteObj.ProductID);
      }
  
      componentDidMount() {
          console.log("NWCustomerDelete-componentDidMount this.props.tuoteObj.Product: " + this.props.tuoteObj.product);
          this.setState({
              ProductID: this.props.tuoteObj.productId,
              ProductName: this.props.tuoteObj.productName,
              SupplierID: this.props.tuoteObj.supplierId,
              UnitsOnOrder: this.props.tuoteObj.unitsOnOrder,
              Discontinued: this.props.tuoteObj.discontinued,
              PostalCode: this.props.tuoteObj.postalCode,
              Phone: this.props.tuoteObj.phone,
              Fax: this.props.tuoteObj.fax}
              );
              //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
              if (this.props.tuoteObj.city) {this.setState({City: this.props.tuoteObj.city});};
              if (this.props.tuoteObj.country) {
                  this.setState({Country: this.props.tuoteObj.country});
              };
      }
  
      handlePerformDelete(event) {
          console.log('NWCutomerDelete . handlePerformDelete . . . . delete:ssä', this.state.ProductID);
          event.preventDefault();
          this.NWDeleteRestApista();
      }
      
      ResetDeleteDone() {
          console.log('ResetDeleteDone ???????????????');
          this.setState({
             ProductID: '', 
          })
          this.handleClickTable();
          this.HaeNWRestApista();
      }
      
      NWDeleteRestApista() {
          let apiUrl = 'https://localhost:5001/nw/products/'+this.state.ProductID;
          // let apiUrl = 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/'+this.state.ProductID;
          console.log("NWDeleteRestApista " + apiUrl);
          fetch(apiUrl, {
              method: "DELETE",
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              },
              body: null
          }).then((response) => response.json())
              .then((json) => {
                  const success = json;
                  console.log(`Response from server: ${success}.`);
                  if (success) {
                     console.log("Pyyntö asiakkaan poistamiseksi tehty -- -- -- -- --");
                     this.dismiss(); 
                     //this.ResetDeleteDone();
                  }
              });
      }
  
      render() {
        let discontinued = JSON.stringify(this.state.Discontinued);   
        if (discontinued === "true") {discontinued = "kyllä"}
        else{discontinued = "Ei"}
          return (
          <form className="box3" onSubmit={this.handlePerformDelete}> 
              <table id="deletetbl">  
                  <tr><td className="otsikko">tuotetunnus:</td><td>{this.state.ProductID}</td></tr>
                  <tr><td className="otsikko">tuotteen nimi:</td><td>{this.state.ProductName}</td></tr>
                  <tr><td className="otsikko">toimittaja:</td><td>{this.state.SupplierID} </td></tr> 
                  <tr><td className="otsikko">Tilauksessa:</td><td>{this.state.UnitsOnOrder} </td></tr>
                  <tr><td className="otsikko">Tuote poistuu:</td><td>{discontinued} </td></tr>
              </table>   
              <br/>
              <button type="submit">Vahvista poisto</button>
          </form>
          );
      }
  }
export default NWProductDelete;

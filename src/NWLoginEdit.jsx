import React, { Component } from 'react';
import './App.css';


class NWLoginEdit extends Component {
    constructor(props) {
      super(props);
      this.state = {tunnusObj: [], LoginID: '', Firstname: '', Lastname: '', Email: '', Password: '' };
      this.handleChangeLoginID = this.handleChangeLoginID.bind(this);
      this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
      this.handleChangeLastname = this.handleChangeLastname.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        console.log("Ollaan NWCustomerEDIT -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    } 

    handleChangeLoginID(event) { 
        var syöte = event.target.value;
        this.setState({...this.state,LoginID: syöte.toUpperCase()});
    }
    handleChangeFirstname(event) { 
        var syöte = event.target.value;
        this.setState({...this.state,Firstname: syöte});
    }  
    handleChangeLastname(event) {
        var syöte = event.target.value;
        this.setState({...this.state,Lastname: syöte});
    }
    handleChangeEmail(event) {
        var syöte = event.target.value;
        this.setState({...this.state,Email: syöte});
    }
    handleChangePassword(event) {
        var syöte = event.target.value;
        this.setState({...this.state,Password: syöte});
    }

    handleSubmit(event) {
        alert('Päivitettävä tunnus: ' + this.state.LoginID);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    callBackRoutine() {
        console.log('NWCustomerEDIT: . . . . callBackRoutine >>>---' + this.state.tunnusObj.LoginID);
    }

    componentDidMount() {
        console.log("NWCustomerEDIT-componentDidMount this.props.tunnusObj.LoginId: " + this.props.tunnusObj.loginID);
        this.setState({
            LoginID: this.props.tunnusObj.loginId,
            Firstname: this.props.tunnusObj.firstname,
            Lastname: this.props.tunnusObj.lastname,
            Email: this.props.tunnusObj.email,
            Password: this.props.tunnusObj.password}
            );
            //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
            if (this.props.tunnusObj.city) {this.setState({City: this.props.tunnusObj.city});};
            if (this.props.tunnusObj.country) {
                this.setState({Country: this.props.tunnusObj.country});
            };
    }

    InsertoiKantaan() {
        // Luodaan tunnusObjekti, johon haetaan state:sta tiedot                     
       const tunnus = {LoginID: this.state.LoginID,
                       Firstname: this.state.Firstname,
                       Lastname: this.state.Lastname,
                       Email: this.state.Email,
                       Password: this.state.Password,
                     };
       // send an asynchronous request to the backend
       const tunnusJson = JSON.stringify(tunnus);
       console.log("tunnusJson = " + tunnusJson);
       const apiUrl= 'https://localhost:5001/nw/logins/'+this.state.LoginID;
    //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/'+this.state.LoginID;
       fetch(apiUrl, {
           method: "PUT",
           headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
           },
           body: tunnusJson
       }).then((response) => response.json())
           .then((json) => {
               const success = json;
               console.log(`Response from server: ${success}.`);
               if (success) {
                  console.log("Pyyntö asiakkaan päivittämiseksi tehty -- -- -- -- --");
                  this.dismiss();
               }
           });
   }

    render() {
        return (

        <div className="box3">
        <form onSubmit={this.handleSubmit}>        
            <input type="text" value={this.state.LoginID} title="Syötä tunnustunnus" placeholder="LoginID" onChange={this.handleChangeLoginID} />    
            <input type="text" value={this.state.Firstname} placeholder="Firstname" onChange={this.handleChangeFirstname} />  
            <input type="text" value={this.state.Lastname} placeholder="Lastname" onChange={this.handleChangeLastname} />    
            <input type="text" value={this.state.Email} placeholder="Email" onChange={this.handleChangeEmail} />   
            <input type="text" value={this.state.Password} placeholder="Password" onChange={this.handleChangePassword} />   
            <br/>
            <button type="submit">Talleta muutokset</button> 
        </form>
        </div>
        );
    }
}
export default NWLoginEdit;

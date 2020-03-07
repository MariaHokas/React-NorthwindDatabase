import React, { Component } from 'react';
import './App.css';


class NWLoginAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { LoginID: '', Firstname: '', Lastname: '', Email: '', Password: '', salattava: '' };
        this.handleChangeLoginID = this.handleChangeLoginID.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangesalattava = this.handleChangesalattava.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        console.log("Ollaan NWLoginAdd -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    }

    handleChangeLoginID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, LoginID: syöte.toUpperCase() });
    }
    handleChangeFirstname(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Firstname: syöte });
    }
    handleChangeLastname(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Lastname: syöte });
    }
    handleChangeEmail(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Email: syöte });
    }
    handleChangePassword(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Password: syöte });
    }
    handleChangesalattava(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, salattava: syöte });
    }
    handleSubmit(event) {
        alert('Lähetettiin tunnus: ' + this.state.Firstname + ' ' + this.state.Lastname);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan() {
        // Luodaan tunnusobjekti, johon haetaan state:sta tiedot                     
        const tunnus = {
            LoginID: this.state.LoginId,
            Firstname: this.state.Firstname,
            Lastname: this.state.Lastname,
            Email: this.state.Email,
            Password: this.state.Password
        };

        // send an asynchronous request to the backend
        const tunnusJson = JSON.stringify(tunnus);
        console.log("tunnusJson = " + tunnusJson);
        const apiUrl = 'https://localhost:5001/nw/logins/';
        //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/logins';
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tunnusJson
        }).then((response) => response.json())
            .then((json) => {
                // store the data returned from the backend to the current state
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö tunnuksen tallettamiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }

    render()
     {
        return (
            <div>
                <form className="box3" onSubmit={this.handleSubmit}>

                    <input type="text" placeholder="Etunimi" onChange={this.handleChangeFirstname} />
                    <input type="text" placeholder="Sukunimi" onChange={this.handleChangeLastname} />
                    <input type="text" placeholder="Sähköposti" onChange={this.handleChangeEmail} />
                    <input type="text" placeholder="Salasana" onChange={this.handleChangePassword}/>
                    
                    <br />
                
                    <button type="submit">Tallenna uudet tiedot</button>
                </form>
            </div>
        );
    }
}
export default NWLoginAdd;

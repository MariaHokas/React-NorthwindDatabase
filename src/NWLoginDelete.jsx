import React, { Component } from 'react';
import './App.css';


class NWLoginDelete extends Component {
    constructor(props) {
        super(props);
        this.state = { tunnusObj: [], LoginID: '', Firstname: '', Lastname: '', Email: '', Password: '' };
        this.handleChangeLoginID = this.handleChangeLoginID.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePerformDelete = this.handlePerformDelete.bind(this);
    }
    dismiss() {
        console.log("Ollaan NWCustomerDelete -dismiss()-rutiinissa - - - - - - ");
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
    handleSubmit(event) {
        alert('Lähetettiin tunnus: ' + this.state.Firstname + ' ' + this.state.Lastname);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    callBackRoutine() {
        console.log('NWCustomerDelete: . . . . callBackRoutine >>>---' + this.state.tunnusObj.LoginID);
    }

    componentDidMount() {
        console.log("NWCustomerDelete-componentDidMount this.props.tunnusObj.Product: " + this.props.tunnusObj.productId);
        this.setState({
            LoginID: this.props.tunnusObj.loginId,
            Firstname: this.props.tunnusObj.firstname,
            Lastname: this.props.tunnusObj.lastname,
            Email: this.props.tunnusObj.email,
            Password: this.props.tunnusObj.password,
            PostalCode: this.props.tunnusObj.postalCode,
            Phone: this.props.tunnusObj.phone,
            Fax: this.props.tunnusObj.fax
        }
        );
        //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
        if (this.props.tunnusObj.city) { this.setState({ City: this.props.tunnusObj.city }); };
        if (this.props.tunnusObj.country) {
            this.setState({ Country: this.props.tunnusObj.country });
        };
    }

    handlePerformDelete(event) {
        console.log('NWCutomerDelete . handlePerformDelete . . . . delete:ssä', this.state.LoginID);
        event.preventDefault();
        this.NWDeleteRestApista();
    }

    ResetDeleteDone() {
        console.log('ResetDeleteDone ???????????????');
        this.setState({
            LoginID: '',
        })
        this.handleClickTable();
        this.HaeNWRestApista();
    }

    NWDeleteRestApista() {
        let apiUrl = 'https://localhost:5001/nw/logins/' + this.state.LoginID;
        // let apiUrl = 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/'+this.state.LoginID;
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
                    console.log("Pyyntö tunnuksen poistamiseksi tehty -- -- -- -- --");
                    this.dismiss();
                    //this.ResetDeleteDone();
                }
            });
    }

    render() {
        return (
            <form className="box3" onSubmit={this.handlePerformDelete}>
                <table id="deletetbl">
                    <tbody>
                        <tr><td className="otsikko">Tunnustunnus:</td><td>{this.state.LoginID}</td></tr>
                        <tr><td className="otsikko">Etunimi:</td><td>{this.state.Firstname}</td></tr>
                        <tr><td className="otsikko">Sukunimi:</td><td>{this.state.Lastname} </td></tr>
                        <tr><td className="otsikko">Tilauksessa:</td><td>{this.state.Email} </td></tr>
                        <tr><td className="otsikko">Salasana:</td><td>{this.state.Password} </td></tr>
                    </tbody>
                </table>
                <br />
                <button type="submit">Vahvista poisto</button>
            </form>
        );
    }
}
export default NWLoginDelete;

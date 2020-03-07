import React, { Component } from 'react';
import './App.css';



class NWProductAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { ProductName: '', SupplierID: '', CategoryID: '', QuantityPerUnit: '', UnitPrice: '', UnitsInStock: '', Discontinued: ''};
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeSupplierID = this.handleChangeSupplierID.bind(this);
        this.handleChangeCategoryID = this.handleChangeCategoryID.bind(this);
        this.handleChangeQuantityPerUnit = this.handleChangeQuantityPerUnit.bind(this);
        this.handleChangeUnitPrice = this.handleChangeUnitPrice.bind(this);
        this.handleChangeUnitsInStock = this.handleChangeUnitsInStock.bind(this);
        this.handleChangeUnitsOnOrder = this.handleChangeUnitsOnOrder.bind(this);
        this.handleChangeReorderLevel = this.handleChangeReorderLevel.bind(this);
        this.handleChangeDiscontinued = this.handleChangeDiscontinued.bind(this);
     
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        console.log("Ollaan NWProductAdd -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    }

    handleChangeProductName(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ProductName: syöte });
    }
    handleChangeSupplierID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, SupplierID: syöte });
    }
    handleChangeCategoryID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, CategoryID: syöte });
    }
    handleChangeQuantityPerUnit(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, QuantityPerUnit: syöte });
    }
    handleChangeUnitPrice(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UnitPrice: syöte });
    }
    handleChangeUnitsInStock(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UnitsInStock: syöte });
    }

    handleChangeUnitsOnOrder(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UnitsOnOrder: syöte });
    }

    handleChangeReorderLevel(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ReorderLevel: syöte });
    }

    handleChangeDiscontinued(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ReorderLevel: syöte });
    }


    handleSubmit(event) {
        alert('Lähetettiin tuote: ' + this.state.ProductName);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan() {
        // Luodaan tuoteobjekti, johon haetaan state:sta tiedot                     
        const tuote = {
            ProductID: this.state.ProductId,
            ProductName: this.state.ProductName,
            SupplierID: this.state.SupplierId,
            CategoryID: this.state.CategoryId,
            QuantityPerUnit: this.state.QuantityPerUnit,
            UnitPrice: this.state.UnitPrice,
            UnitsInStock: this.state.UnitsInStock,
            UnitsOnOrder: this.state.UnitsOnOrder,
            ReorderLevel: this.state.ReorderLevel,
            Discontinued: this.Discontinued
        };

        // send an asynchronous request to the backend
        const tuoteJson = JSON.stringify(tuote);
        console.log("tuoteJson = " + tuoteJson);
        const apiUrl = 'https://localhost:5001/nw/products';
        //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/products';
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tuoteJson
        }).then((response) => response.json())
            .then((json) => {
                // store the data returned from the backend to the current state
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö asiakkaan tallettamiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }

    render() {
        return (
            <form className="box3" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="ProductName" onChange={this.handleChangeProductName} />
                <input type="text" placeholder="SupplierID" onChange={this.handleChangeSupplierID} />
                <input type="text" placeholder="CategoryID" onChange={this.handleChangeCategoryID} />
                <input type="text" placeholder="QuantityPerUnit" onChange={this.handleChangeQuantityPerUnit} />
                <input type="text" placeholder="UnitPrice" onChange={this.handleChangeUnitPrice} />
                <input type="text" placeholder="UnitsInStock" onChange={this.handleChangeUnitsInStock} />
                <input type="text" placeholder="UnitsOnOrder" onChange={this.handleChangeUnitsOnOrder} />
                <input type="text" placeholder="ReorderLevel" onChange={this.handleChangeReorderLevel} />
               
                <button type="submit">Tallenna uudet tiedot</button>
            </form>
        );
    }
}
export default NWProductAdd;

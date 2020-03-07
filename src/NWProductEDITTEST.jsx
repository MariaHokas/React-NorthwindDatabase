import React, { Component } from 'react';
import './App.css';


class NWProductEDITTEST extends Component {
    constructor(props) {
        super(props);
        this.state = { tuoteObj: [], ProductID: '', ProductName: '', SupplierID: '', CategoryID: '', QuantityPerUnit: '', UnitPrice: '', UnitsInStock: '', UnitsOnOrder: '', ReorderLevel: '', Discontinued: '' };
        this.handleChangeProductID = this.handleChangeProductID.bind(this);
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
        console.log("Ollaan NWCustomerEDIT -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    }

    handleChangeProductID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ProductID: syöte.toUpperCase() });
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
        this.setState({ ...this.state, Discontinued: syöte });
    }

    handleSubmit(event) {
        alert('Päivitettävä tuote: ' + this.state.ProductID);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    callBackRoutine() {
        console.log('NWCustomerEDIT: . . . . callBackRoutine >>>---' + this.state.tuoteObj.ProductID);
    }

    componentDidMount() {
        console.log("NWCustomerEDIT-componentDidMount this.props.tuoteObj.ProductID: " + this.props.tuoteObj.productID);
        this.setState({
            ProductID: this.props.tuoteObj.productId,
            ProductName: this.props.tuoteObj.productName,
            SupplierID: this.props.tuoteObj.supplierId,
            CategoryID: this.props.tuoteObj.categoryId,
            QuantityPerUnit: this.props.tuoteObj.quantityPerUnit,
            UnitPrice: this.props.tuoteObj.unitPrice,
            UnitsInStock: this.props.tuoteObj.unitsInStock,
            UnitsOnOrder: this.props.tuoteObj.unitsOnOrder,
            ReorderLevel: this.props.tuoteObj.reorderLevel,
            Discontinued: this.props.tuoteObj.discontinued
        }
        );
        //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
        if (this.props.tuoteObj.UnitsInStock) { this.setState({ UnitsInStock: this.props.tuoteObj.UnitsInStock }); };
        if (this.props.tuoteObj.UnitsOnOrder) {
            this.setState({ UnitsOnOrder: this.props.tuoteObj.UnitsOnOrder });
        };
    }

    InsertoiKantaan() {
        // Luodaan tuoteobjekti, johon haetaan state:sta tiedot                     
        const tuote = {
            ProductID: this.state.ProductID,
            ProductName: this.state.ProductName,
            SupplierID: this.state.SupplierID,
            CategoryID: this.state.CategoryID,
            QuantityPerUnit: this.state.QuantityPerUnit,
            UnitPrice: this.state.UnitPrice,
            UnitsInStock: this.state.UnitsInStock,
            UnitsOnOrder: this.state.UnitsOnOrder,
            ReorderLevel: this.state.ReorderLevel,
            Discontinued: this.state.Discontinued
        };
        // send an asynchronous request to the backend
        const tuoteJson = JSON.stringify(tuote);
        console.log("tuoteJson = " + tuoteJson);
        const apiUrl = 'https://localhost:5001/nw/products/' + this.state.ProductID;
        //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/'+this.state.ProductID;
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tuoteJson
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
        let discontinued = JSON.stringify(this.state.Discontinued);

        if (discontinued === "true") {
            return (
                <form className="box3" onSubmit={this.handleSubmit}>
                    <label>Tuotetunnus</label><input type="text" value={this.state.ProductID} title="Syötä tuotetunnus" placeholder="ProductID" onChange={this.handleChangeProductID} />
                    <label>Tuotenimi</label><input type="text" value={this.state.ProductName} title="Syötä nimi" placeholder="ProductName" onChange={this.handleChangeProductName} />
                    <label>Toimittaja</label><input type="text" value={this.state.SupplierID} placeholder="SupplierID" onChange={this.handleChangeSupplierID} />
                    <label>Kategoriatunnus</label><input type="text" value={this.state.CategoryID} placeholder="CategoryID" onChange={this.handleChangeCategoryID} />
                    <label>Määrä pakkauksessa</label><input type="text" value={this.state.QuantityPerUnit} placeholder="QuantityPerUnit" onChange={this.handleChangeQuantityPerUnit} />
                    <label>Yksikkö hinta</label><input type="text" value={this.state.UnitPrice} placeholder="UnitPrice" onChange={this.handleChangeUnitPrice} />
                    <label>Tuotteita varastossa</label><input type="text" value={this.state.UnitsInStock} placeholder="UnitsInStock" onChange={this.handleChangeUnitsInStock} />                   
                    <br />
                    <label>Tuote poistumassa</label>
                    <ul>
                        <li>
                            <label><input type="radio" value="true" checked={true} onChange={this.handleChangeDiscontinued} />Kyllä - tuote on poistumassa</label>
                        </li>
                        <li>
                            <label><input type="radio" value="false" checked={this.state.Discontinued === "false"} onChange={this.handleChangeDiscontinued} />EI - tuote ei ole poistumassa</label>
                        </li>
                    </ul>
                    <button type="submit">Talleta muutokset</button>
                </form>
            );
        }
        else if (discontinued === "false") {
            return (
                <form className="box3" onSubmit={this.handleSubmit}> 
                    <label>Tuotetunnus</label><input type="text" value={this.state.ProductID} title="Syötä tuotetunnus" placeholder="ProductID" onChange={this.handleChangeProductID} />
                    <label>Tuotenimi</label><input type="text" value={this.state.ProductName} title="Syötä nimi" placeholder="ProductName" onChange={this.handleChangeProductName} />
                    <label>Toimittaja</label><input type="text" value={this.state.SupplierID} placeholder="SupplierID" onChange={this.handleChangeSupplierID} />
                    <label>Kategoriatunnus</label><input type="text" value={this.state.CategoryID} placeholder="CategoryID" onChange={this.handleChangeCategoryID} />
                    <label>Määrä pakkauksessa</label><input type="text" value={this.state.QuantityPerUnit} placeholder="QuantityPerUnit" onChange={this.handleChangeQuantityPerUnit} />
                    <label>Yksikkö hinta</label><input type="text" value={this.state.UnitPrice} placeholder="UnitPrice" onChange={this.handleChangeUnitPrice} />
                    <label>Tuotteita varastossa</label><input type="text" value={this.state.UnitsInStock} placeholder="UnitsInStock" onChange={this.handleChangeUnitsInStock} />                                  
                    <br />
                    <label>Tuote poistumassa</label>
                    <ul>
                        <li>
                            <label>
                                <input type="radio" value="true" checked={this.state.Discontinued === "true"} onChange={this.handleChangeDiscontinued} />
                                Kyllä - tuote on poistumassa
                    </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" value="true" checked={true} onChange={this.handleChangeDiscontinued} />
                                EI - tuote ei ole poistumassa
                    </label>
                        </li>
                    </ul>
                    <button type="submit">Talleta muutokset</button>
                </form>
            );
        }
        else {
            return (
                <form className="box3" onSubmit={this.handleSubmit}>
                    <label>Tuotetunnus</label><input type="text" value={this.state.ProductID} title="Syötä tuotetunnus" placeholder="ProductID" onChange={this.handleChangeProductID} />
                    <label>Tuotenimi</label><input type="text" value={this.state.ProductName} title="Syötä nimi" placeholder="ProductName" onChange={this.handleChangeProductName} />
                    <label>Toimittaja</label><input type="text" value={this.state.SupplierID} placeholder="SupplierID" onChange={this.handleChangeSupplierID} />
                    <label>Kategoriatunnus</label><input type="text" value={this.state.CategoryID} placeholder="CategoryID" onChange={this.handleChangeCategoryID} />
                    <label>Määrä pakkauksessa</label><input type="text" value={this.state.QuantityPerUnit} placeholder="QuantityPerUnit" onChange={this.handleChangeQuantityPerUnit} />
                    <label>Yksikkö hinta</label><input type="text" value={this.state.UnitPrice} placeholder="UnitPrice" onChange={this.handleChangeUnitPrice} />
                    <label>Tuotteita varastossa</label><input type="text" value={this.state.UnitsInStock} placeholder="UnitsInStock" onChange={this.handleChangeUnitsInStock} />                   
                    <br />
                    <label>Tuote poistumassa</label>
                    <ul>
                        <li>
                            <label>
                                <input type="radio" value="true" checked={this.state.Discontinued === "true"} onChange={this.handleChangeDiscontinued} />
                                Kyllä - tuote on poistumassa
                        </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" value="false" checked={this.state.Discontinued === "false"} onChange={this.handleChangeDiscontinued} />
                                EI - tuote ei ole poistumassa
                        </label>
                        </li>
                    </ul>
                    <button type="submit">Talleta muutokset</button>
                </form>
            );
        }
    }
}
export default NWProductEDITTEST;

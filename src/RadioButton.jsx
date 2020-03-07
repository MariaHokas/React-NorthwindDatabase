
import React, { Component } from 'react';
import './App.css';

class RadioButton extends Component {

render() {
  let discontinued = JSON.stringify(this.props.Discontinued);
  const {onChangeValue} = this.props;
  if (discontinued === "true") {
    return (
      <div>
        <ul>
          <li>
            <label><input type="radio" value="true" checked={true} onClick={this.props.handleChangeDiscontinued} />Kyllä - tuote on poistumassa</label>
          </li>
          <li>
            <label><input type="radio" value="false" checked={(this.props.Discontinued) === "false"} onChange={onChangeValue}
            /> EI - tuote ei ole poistumassa</label>
          </li>
        </ul>
      </div>
    );
  }
  else if (discontinued === "false") {
    return (
      <div>
        <ul>
          <li>
            <label>
              <input type="radio" value="true" checked={(this.props.Discontinued) === "true"} onChange={onChangeValue} />
              Kyllä - tuote on poistumassa
              </label>
          </li>
          <li>
            <label>
              <input type="radio" value="true" checked={true} onChange={onChangeValue} />
              EI - tuote ei ole poistumassa
</label>
          </li>
        </ul>

      </div>
    );
  }
  else {
    return (
      <div>
        <ul>
          <li>
            <label>
              <input type="radio" value="true" checked={(this.props.Discontinued) === "true"} onChange={onChangeValue} />
              Kyllä - tuote on poistumassa
</label>
          </li>
          <li>
            <label>
              <input type="radio" value="false" checked={(this.props.Discontinued) === "false"} onChange={onChangeValue} />
              EI - tuote ei ole poistumassa
</label>
          </li>
        </ul>

      </div>
    );

  }
}
}
export default RadioButton;
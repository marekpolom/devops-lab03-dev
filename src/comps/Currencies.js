import React from "react";

class Currencies extends React.Component {
  render() {
    return (
        <option value={this.props.code}>{this.props.code} ({this.props.symbol})</option>
    );
  }
}

export default Currencies;

import React from "react";

class Flag extends React.Component {
  render() {
    return (
        <div key={this.props.index} className="flag">
            <img src={this.props.img} alt={this.props.country}></img>
            <p>{this.props.country}</p>
        </div>
    );
  }
}

export default Flag;

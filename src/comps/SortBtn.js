import React from "react";

class SortBtn extends React.Component {
  render() {
    return (
        <div className="sort-btn-cont">
            <button className="sort-btn" onClick={this.props.onClick.bind(this)}>Sort</button>
        </div>
    );
  }
}

export default SortBtn;

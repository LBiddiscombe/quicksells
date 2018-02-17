import React from "react";

class ListItem extends React.Component {
  render() {
    return (
      <li className="listitem">
        <div className="listitemimg" />
        <div className="listitemlabel">Apples Granny Smith</div>
      </li>
    );
  }
}

export default ListItem;

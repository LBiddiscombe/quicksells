import React from "react";
import ListItem from "./ListItem";

class ListItems extends React.Component {
  render() {
    return (
      <div className="panel-block">
        <ul className="listitems">
          <ListItem />
        </ul>
      </div>
    );
  }
}

export default ListItems;

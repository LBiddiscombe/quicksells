import React from "react";
import Search from "./Search";
import ListItems from "./ListItems";

class Aside extends React.Component {
  render() {
    return (
      <aside className="left">
        <nav className="panel">
          <Search />
          <ListItems />
        </nav>
      </aside>
    );
  }
}

export default Aside;

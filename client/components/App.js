import React from "react";
import { Link } from "react-router-dom";

function App({ Wrapped, routeProps }) {
  return (
    <div className="container">
      <nav className="nav-extended">
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="tab">
              <Link to={"/songs/new"}>New Song</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Wrapped routeProps={routeProps} />
    </div>
  );
}

export default App;

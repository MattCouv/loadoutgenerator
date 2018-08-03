import React from 'react';
import { Link } from "react-router-dom";


const Menu = props => (
  <header id="head">
    <div className="game"><a href="/"><img src="/assets/bf4/logosmall.png" alt="" /></a></div>
        <div className="nav">
          <div className="menu">
            <div className="home">
              <Link to="/" className="active-borders-right" id="soldierBtn">Soldier</Link>
            </div>
            <table className="left">
              <tbody>
                <tr>
                  <td>
                    <Link to="/about" className="active-borders-left" id="aboutBtn">About</Link>
                  </td>
                  <td>
                    <Link to="/" className="active-borders-left" onClick={props.reset}>Reset</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  </header>
);

export default Menu;
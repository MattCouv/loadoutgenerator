import React from 'react';
import { Link } from "react-router-dom";


const Menu = ({ reset, playerDataAvailable }) => (
  <header id="head">
    <div className="game">
      <a href="/">
        <img src="/assets/bf4/logosmall.png" alt="" />
      </a>
    </div>
    <div className="nav">
      <div className="menu">
        <Link to="/" className="active-borders-right" id="soldierBtn">
          Home
        </Link>
        {playerDataAvailable ? (
          <Link to="/soldier" className="active-borders-left" onClick={reset}>
            Reset
          </Link>
        ) : (
          <Link to="/soldier" className="active-borders-left" id="soldierBtn">
            Soldier
          </Link>
        )}
        <Link to="/about" className="active-borders-left" id="aboutBtn">
          About
        </Link>
      </div>
    </div>
  </header>
);

export default Menu;
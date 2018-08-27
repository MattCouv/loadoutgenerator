import React from 'react';
import Link from 'next/link';


export default ({ reset, withPlayerInfo }) => (
  <header id="head">
    <div className="game">
      <a href="/">
        <img src="/static/bf4/logosmall.png" alt="" />
      </a>
    </div>
    <div className="nav">
      <div className="menu">
        <Link href="/">
          <a className="active-borders-right" id="soldierBtn">
            Home
          </a>
        </Link>
        {withPlayerInfo ? (
          <a className="active-borders-left" href="/sign-in" onClick={reset}>
              Reset
          </a>
        ) : (
          <Link href="/sign-in">
            <a className="active-borders-left" id="soldierBtn">
              Soldier
            </a>
          </Link>
        )}
        <Link href="/about">
          <a className="active-borders-left" id="aboutBtn">
            About
          </a>
        </Link>
      </div>
    </div>
  </header>
);

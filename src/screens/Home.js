import React from 'react';


export default () => (
  <div>
    <div className="container" id="login">
      <div id="help">
        <p>
          Get started it's easy !
          <br />
          Enter your BF4 soldier name and select the platform you play on and submit !
        </p>
      </div>
      <form className="main">
        Soldier Name :
        <input type="text" id="soldiername" className="box-content active-borders" />
          Your Platform :
        <select name="browser" className="box-content active-borders" id="platform">
          <option value="pc">
              pc
          </option>
          <option value="xbox">
              xbox
          </option>
          <option value="ps3">
              ps3
          </option>
          <option value="xone">
              xone
          </option>
          <option value="ps4">
              ps4
          </option>
        </select>
        <button id="sub" type="submit" className="gen-border box-content">
          Submit
        </button>
      </form>
    </div>
  </div>
);

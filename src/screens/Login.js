import React, { Component } from 'react';

class Login extends Component {
  render() {
    const options = [
      { value: 'pc', label: 'pc'},
      { value: 'xbox', label: 'xbox'},
      { value: 'ps3', label: 'ps3'},
      { value: 'xone', label: 'xbox one'},
      { value: 'ps4', label: 'ps4'}
    ];
    return(
      <React.Fragment>
        <div className="container" id="login">
          <div id="help">
            <p>Get started it's easy ! <br />Enter your BF4 soldier name and select the platform you play on and submit ! </p>
          </div>
          <div className="main">
            <form onSubmit={this.props.getPlayer}>
              Soldier Name : <input type="text" id="soldiername" name="name" className="box-content active-borders" />
                Your Platform :
              <select name="plat" className="box-content active-borders" id="platform">
                {options.map((item) => 
                  <option key={item.value} value={item.value} checked={item.value === this.props.plat}>{item.label}</option>
                )}
              </select>
              <button id="sub" className="gen-border box-content">Submit</button>
            </form>
          </div>
        </div>
        <div id="error" className="container">
          <p className="demo">Error you must input your soldier name and select your soldier's platform</p>
        </div>
      </React.Fragment>
    )
  }
}

export default Login;
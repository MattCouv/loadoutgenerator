import React from 'react';
import { Redirect } from 'react-router';

export default ({
  playerDataAvailable, getPlayer, error, plat,
}) => {
  const options = [
    { value: 'pc', label: 'pc' },
    { value: 'xbox', label: 'xbox' },
    { value: 'ps3', label: 'ps3' },
    { value: 'xone', label: 'xbox one' },
    { value: 'ps4', label: 'ps4' },
  ];
  if (playerDataAvailable) {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      <div className="container" id="login">
        {error && (
          <div id="error">
            <p className="demo">Your soldier is missing in action.</p>
          </div>)}
        <div id="help">
          <p>
            Get started it's easy ! <br />
            Enter your BF4 soldier name and select the platform you play on and submit !
          </p>
        </div>
        <div className="main">
          <form onSubmit={getPlayer}>
            Soldier Name : <input type="text" id="soldiername" name="name" className={`box-content active-borders ${error && 'error'}`} />
            Your Platform :
            <select name="plat" className="box-content active-borders" id="platform">
              {options.map(item => (
                <option
                  key={item.value}
                  value={item.value}
                  checked={item.value === plat}
                >
                  {item.label}
                </option>
              ))}
            </select>
            <button type="submit" id="sub" className="gen-border box-content">
              Submit
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

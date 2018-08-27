import React, { Component } from 'react';
import { connect } from 'react-redux';
import { redirectIfAuthenticated } from '../lib/auth';
import { login } from '../store/login/actions';
import Loading from '../Components/Loading';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getInitialProps(ctx) {
    // If it exists already a session started, redirect.
    redirectIfAuthenticated(ctx);
    // Then they both return their initial props
  }
  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    this.props.login(data.name, data.plat);
    return false;
  }
  render() {
    const { isLoginPending, isLoginSuccess, loginError } = this.props;

    const options = [
      { value: 'pc', label: 'pc' },
      { value: 'xbox', label: 'xbox' },
      { value: 'ps3', label: 'ps3' },
      { value: 'xone', label: 'xbox one' },
      { value: 'ps4', label: 'ps4' },
    ];
    return (
      <>
      { isLoginPending ? <Loading /> :
        <div className="container" id="login">
          {loginError && (
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
            <form method="get" onSubmit={this.onSubmit}>
              Soldier Name : <input type="text" id="soldiername" name="name" className={`box-content active-borders ${loginError && 'error'}`} />
              Your Platform :
            <select name="plat" className="box-content active-borders" id="platform">
                {options.map(item => (
                  <option
                    key={item.value}
                    value={item.value}
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
      }
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.login.isLoginPending,
    isLoginSuccess: state.login.isLoginSuccess,
    loginError: state.login.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

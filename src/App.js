import React, { Component } from 'react';
import { Switch, Route } from "react-router";
import Loadout from "./screens/Loadout";
import Login from "./screens/Login";
import About from "./screens/About";
import Menu from './Components/Menu';
import "./css/normalize.css";
import "./css/main.css";

const fetchPlayerData = (plat, name) => {
  const url = "https://api.bf4stats.com/api/playerInfo?plat=" + plat + "&name=" + name + "&opt=assignments,imagePaths,names,upcomingUnlocks,weapons,details,kititems&output=json";

  return fetch(url).then((response) => {
    if (response.ok) {
      return response;
    }

    throw new Error('Something went wrong.');
  }).then((response) => response.json());
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: props.login,
      loading: true,
      player: null,
      loadout: null
    }
  }

  submitLogin = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, loading: true })
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });
    fetchPlayerData(data.plat, data.name)
      .then((json) => {
        localStorage.setItem('login', JSON.stringify(data));
        this.setState({ ...this.state, login: data, player: json, loading: false })
      })
      .catch(() => {
        this.setState({ ...this.state, loading: false })
      });
  }

  reset = () => {
    localStorage.removeItem('login');
    this.setState({
      ...this.state,
      login: {name: '',plat: 'pc'},
      player: null
    })
  }

  setLoadout = (loadout) => {
    this.setState({...this.state, loadout});
  }

  componentDidMount() {
    const {plat, name} = this.state.login;
    fetchPlayerData(plat, name)
      .then((json) => {
        this.setState({ ...this.state, player: json, loading: false })
      }).catch( () => {
        this.setState({...this.state, loading: false})
      });
  }

  render() {
    return (
      <div>
        <Menu reset={this.reset}/>
        <Switch>
          <Route exact path="/" component={() => 
            this.state.loading ? (<div>loading!!</div>):
            this.state.player === null ?
            <Login 
              name={this.state.login.name}
              plat={this.state.login.plat}
              getPlayer={this.submitLogin}/>:
                <Loadout player={this.state.player} loadout={this.state.loadout} setLoadout={this.setLoadout}/>
            }/>
          <Route path="/about" component={About}/>
        </Switch>
      </div>
    );
  }
}

export default App;

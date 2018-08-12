import React, { Component } from 'react';
import { Switch, Route } from "react-router";
import Loadout from "./screens/Loadout";
import Loading from "./screens/Loading";
import Login from "./screens/Login";
import About from "./screens/About";
import NoMatch from "./screens/NoMatch";
import Menu from './Components/Menu';
import "./css/normalize.css";
import "./css/main.css";
import "./css/lineart.css";
import Generator from './Components/Generator';

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
      loadout: null,
      error: false
    }
    this.Generator = new Generator();

    this.generate = {
      genAll: this.genAll,
      genPrimary: this.genPrimary,
      genSecondary: this.genSecondary,
      genGadget1: this.genGadget1,
      genGadget2: this.genGadget2,
      genGrenade: this.genGrenade,
      genKnife: this.genKnife
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
        this.setState({
          ...this.state,
          login: data,
          player: json,
          error: false,
          loading: false
        })
      })
      .catch(() => {
        this.setState({
          ...this.state,
          error: true,
          loading: false
        })
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
    this.setState({...this.state, loadout, loading: false});
  }

  genAll = () => {
    this.Generator.randomKit()
      .randomPrimary()
      .randomSecondary()
      .randomGadget1()
      .randomGadget2()
      .randomGrenade()
      .randomKnife();
    this.setLoadout(this.Generator.loadout);
  }

  genPrimary = () => {
    this.Generator.randomPrimary();
    this.setLoadout(this.Generator.loadout);
  }

  genSecondary = () => {
    this.Generator.randomSecondary();
    this.setLoadout(this.Generator.loadout);
  }

  genGadget1 = () => {
    this.Generator.randomGadget1();
    this.setLoadout(this.Generator.loadout);
  }

  genGadget2 = () => {
    this.Generator.randomGadget2();
    this.setLoadout(this.Generator.loadout);
  }

  genGrenade = () => {
    this.Generator.randomGrenade();
    this.setLoadout(this.Generator.loadout);
  }

  genKnife = () => {
    this.Generator.randomKnife();
    this.setLoadout(this.Generator.loadout);
  }

  componentDidMount() {
    const {plat, name} = this.state.login;
    fetchPlayerData(plat, name)
      .then((json) => {
        this.setState({ ...this.state, player: json, loading: false })
      }).catch( () => {
        this.setState({...this.state, loading: false})
      });
    this.genAll();
  }

  render() {
    return <div>
      <Menu reset={this.reset} playerDataAvailable={this.state.player !== null}/>
        {this.state.loading ? <Loading /> : <Switch>
              <Route exact path="/" component={() => <Loadout generate={this.generate} loadout={this.state.loadout} />} />
              <Route path="/soldier" component={() => <Login error={this.state.error} getPlayer={this.submitLogin} playerDataAvailable={this.state.player!==null} />} />
              <Route path="/about" component={About} />
              <Route component={NoMatch} />
        </Switch>}
      </div>;
  }
}

export default App;

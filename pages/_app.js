import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../lib/withReduxStore';
import {isAuthenticated} from '../lib/auth';
import Menu from '../Components/Menu';
import { withPlayerData } from '../store/player/actions';
import { logout } from '../store/login/actions';
import { genAll } from '../store/loadout/actions';
import '../css/normalize.css';
import '../css/main.css';
import '../css/lineart.css';

class MyApp extends App {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({Component, ctx }) {
    let pageProps = {};

    if (!!ctx.req) {
      ctx.reduxStore.dispatch(withPlayerData(isAuthenticated(ctx)));
    }
    ctx.reduxStore.dispatch(genAll());
    
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  reset = (e) => {
    e.preventDefault();
    this.props.reduxStore.dispatch(logout())
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const { withPlayerInfo, loadout } = reduxStore.getState();
    return (
      <Container>
        <Provider store={reduxStore}>
          <>
            <Menu reset={this.reset} withPlayerInfo={withPlayerInfo} />
            <Component {...pageProps}/>
          </>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);

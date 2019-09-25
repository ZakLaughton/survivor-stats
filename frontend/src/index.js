import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';

require(`es6-shim`);

const AppRouter = () => (
  <Switch>
    <Route exact path='/' render={() => <Redirect to='/39' />} />
    <Route
      exact
      path='/:activeSeasonNumber'
      render={props => <Redirect to={`/${props.match.params.activeSeasonNumber}/00`} />}
    />
    <Route
      exact
      path='/:activeSeasonNumber/:activeEpisodeNumber'
      render={props => <App {...props} />}
    />
  </Switch>
);

ReactDOM.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
  document.getElementById(`root`),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

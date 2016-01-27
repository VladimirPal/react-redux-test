import React from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import { createStore } from 'redux'
import { Provider } from 'react-redux';
import cartApp from './components/cart/reducers'

import BaseComponent from './components/base/component';
import ShopComponent from './shop/component';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
let store = createStore(cartApp)

render((
  <Provider store={store}>
    <Router history={appHistory}>
      <Route component={BaseComponent}>
        <Route component={ShopComponent} path="/"/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));

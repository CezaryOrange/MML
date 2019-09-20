/*
 * Copyright (C) 2018 - 2019 Orange
 * 
 * This software is distributed under the terms and conditions of the 'MIT'
 * license which can be found in the file 'LICENSE.txt' in this package distribution 
 * or at https://spdx.org/licenses/MIT
 *
 */

 /* Orange contributed module for use on CozyCloud platform
 * 
 * Module name: MML - Mapping My Life
 * Version:     1.0.5
 * Created:     2018 by Orange
 */


/* global cozy */

import React from 'react'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import HomePage from './containers/HomePage'
import FavorisPage from './containers/FavorisPage'
import AppNav from './components/AppNav'
import ItineraryPage from './containers/ItineraryPage'
import HelpPage from './containers/Help'
import 'bootstrap-css'
import 'bootstrap-theme-css'
import 'font-awesome-css'
// ADD COZY BAR CSS
import './styles/main.css'
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

let store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
)
let history = createBrowserHistory()
document.addEventListener('DOMContentLoaded', () => {
  const applicationElement = document.querySelector('[role=application]')
  const data = applicationElement.dataset
  const cozyOptions = {
    cozyURL: `//${data.cozyDomain}`,
    token: data.cozyToken
  }
  cozy.client.init(cozyOptions)
  // ADD COZY BAR
  cozy.bar.init({
    appName: data.cozyAppName,
  
    iconPath: data.cozyIconPath,
    lang: 'fr',
    replaceTitleOnMobile: true
  })
  render(
    <Provider store={store}>
      <BrowserRouter history={history}>
        <div>
          <AppNav />
          <Route exact path='/' component={HomePage} />
          <Route path='/map' component={FavorisPage} />
          <Route path='/trace' component={ItineraryPage} />
          <Route path='/help' component={HelpPage} />
        </div>
      </BrowserRouter>
    </Provider>
  , applicationElement)
})

import React from 'react';
import MainPage from './MainPage.jsx';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Header from './Header.jsx';
import Results from './Results.jsx';
import ReactDOM from 'react-dom';
import reducers from './../reducers/index.js';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './../store/store.js';

  ReactDOM.render((
     <Provider store={store}>
      <BrowserRouter>
        <div className="main">
          <Header />
          <Route exact path="/" component={MainPage} />
        </div>
      </BrowserRouter>
     </Provider>
     ),
     document.getElementById('app')
);





// store.subscribe(()=> render());
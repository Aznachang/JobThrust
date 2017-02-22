import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './component/App.jsx';
import LogIn from './component/LogIn.jsx';
import ManageComponent from './component/manageComponent.jsx';
import SearchContainer from './component/SearchContainer.jsx';

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="manage" component={ManageComponent}/>
          <Route path="search" component={SearchContainer}/>
        </Route>
        <Route path="login" component={LogIn} />
    </Router>
), document.getElementById('app'))

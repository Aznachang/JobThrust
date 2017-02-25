import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './component/App.jsx';
import LogIn from './component/LogIn.jsx';
import ManageComponent from './component/manageComponent.jsx';
import SearchContainer from './component/SearchView/SearchContainer.jsx';
import Note from './component/NoteContainer.jsx';
import CompanyComponent from './component/CompanyComponent.jsx'
import JobOfferContainer from './component/JobOfferContainer.jsx';

render((
    <Router history={browserHistory}>
        <Route component={App}>
          <Route path="/manage" component={ManageComponent}/>
          <Route path="/search" component={SearchContainer}/>
          <Route path= "/notes" component={Note} />
          <Route path= "/company" component={CompanyComponent} />
          <Route path = "/offers" component ={JobOfferContainer}/>
        </Route>
        <Route path="/" component={LogIn} />
        <Route path="/login" component={LogIn} />
    </Router>
), document.getElementById('app'))


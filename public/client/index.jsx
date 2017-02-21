import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './component/App.jsx';
import LogIn from './component/LogIn.jsx';

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="login" component={LogIn} />
    </Router>,
    document.getElementById('app'))

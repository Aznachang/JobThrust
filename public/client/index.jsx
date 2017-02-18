import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './client/components/App.jsx';

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
    </Router>,
    document.getElementById('app')
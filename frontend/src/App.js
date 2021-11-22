import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Customer from './components/Customer';
import Staff from './components/Staff'

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/customer' component={Customer} />
                <Route path='/staff' component={Staff} />
                <Route path='/manager' component={Manager} />
            </Switch>
        </Router>
    );
}

function Manager() {
    return <div className='App'>
        Manager
    </div>
}

export default App;
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/Navbar';
import Feedback from './components/Customer/Feedback';
import Personal from './components/Customer/Personal';
import Notifications from './components/Customer/Notifications';

function App() {
    return (
        <div className='App'>
            <Router>
                <NavBar />
                <div className="container-fluid px-5">
                    <Switch>
                        <Route exact path="/customer" component={Personal} />
                        <Route exact path="/customer/notifications" component={Notifications} />
                        <Route exact path="/customer/feedback" component={Feedback} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
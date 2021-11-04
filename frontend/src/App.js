import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, Route, Switch } from 'react-router-dom';
import TutorialsList from './components/tutorial-list.component'
import AddTutorial from './components/add-tutorial.component'
import Tutorial from './components/tutorial.component'
import './App.css'

class App extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/tutorials" className="navbar-brand">
                        Tutorial
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/tutorials"} className="nav-link">
                                Tutorials
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
                        <Route exact path="/add" component={AddTutorial} />
                        <Route path="/tutorials/:id" component={Tutorial} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
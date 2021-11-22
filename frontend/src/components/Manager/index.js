import { Switch, Route } from "react-router"
import Favours from "./Favours"
import ManagerNavbar from './ManagerNavbar'
import Products from "./Products"

export default function Staff() {
    const mode = window.localStorage.getItem('mode');
    return mode === '/manager' ? <div className='App'>
        <ManagerNavbar />
        <Switch>
            <Route exact path={['/manager', '/manager/products']} component={Products} />
            <Route exact path='/manager/favours' component={Favours} />
            {/* <Route exact path='/staff/lookup' component={LookUp} /> */}
        </Switch>
    </div> : <h3>You need to have Manager role</h3>
}
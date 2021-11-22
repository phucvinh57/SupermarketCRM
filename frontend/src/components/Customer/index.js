import CustomerNavBar from './CustomerNavbar';
import Feedback from './Feedback';
import Personal from './Personal';
import Notifications from './Notifications';
import { Switch, Route } from 'react-router';

export default function Customer() {
    const mode = window.localStorage.getItem('mode');
    return mode === '/customer' ? <div className='App'>
        <CustomerNavBar />
        <div className="container-fluid px-5">
            <Switch>
                <Route exact path="/customer" component={Personal} />
                <Route exact path="/customer/notifications" component={Notifications} />
                <Route exact path="/customer/feedback" component={Feedback} />
            </Switch>
        </div>
    </div> : <h3>You need to have Customer role</h3>
}
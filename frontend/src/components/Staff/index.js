import { Switch, Route } from 'react-router-dom'
import AfterSelling from './AfterSelling'
import AtPlaceCaring from './AtPlaceCaring'
// import LookUp from './Lookup'
import StaffNavbar from './StaffNavbar'

export default function Staff() {
    return <div className='App'>
        <StaffNavbar />
        <Switch>
            <Route exact path={['/staff','/staff/apc']} component={AtPlaceCaring} />
            <Route exact path='/staff/ass' component={AfterSelling} />
            {/* <Route exact path='/staff/lookup' component={LookUp} /> */}
        </Switch>
    </div>
}
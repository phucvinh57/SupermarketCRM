import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { BoxArrowInRight } from 'react-bootstrap-icons';
import Customer from './components/Customer';
import Staff from './components/Staff'
import Manager from './components/Manager'

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={ModeOption} />
                <Route path='/customer' component={Customer} />
                <Route path='/staff' component={Staff} />
                <Route path='/manager' component={Manager} />
            </Switch>
        </Router>
    );
}

function ModeOption() {
    const modes = ['/customer', '/staff', '/manager']
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('');

    const showLogin = (mode) => {
        setShow(true)
        setMode(mode)
    }

    const redirect = () => {
        window.location.href = mode
    }

    return <div className='container position-absolute top-50 start-50 translate-middle'>
        <div className='row justify-content-center'>
            <Button className="fw-bold col-3 mx-3 p-3 btn-dark"
                onClick={() => showLogin(modes[0])}>
                Khách hàng
            </Button>
            <Button className="fw-bold col-3 mx-3 p-3 btn-dark"
                onClick={() => showLogin(modes[1])}>
                Nhân viên
            </Button>
            <Button className="fw-bold col-3 mx-3 p-3 btn-dark"
                onClick={() => showLogin(modes[2])}>
                Quản lý
            </Button>
        </div>

        <LoginBox show={show} redirect={redirect} mode={mode} onHide={() => setShow(false)} />
    </div>
}

function LoginBox(props) {
    const [ssn, setSsn] = useState('');

    const login = () => {
        alert(`You logged in with ${props.mode.slice(1)} role`)
        window.localStorage.setItem('mode', props.mode)
        window.localStorage.setItem('id_ssn', ssn)
        props.redirect()
    }

    return <Modal size='lg' {...props}>
        <Modal.Header closeButton>
            <Modal.Title>
                Nội dung feedback <u>Quần áo</u>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Nhập mã SSN/ID</Form.Label>
                    <Form.Control type='tel' value={ssn} onChange={e => setSsn(e.target.value)} required/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={login} className='d-flex align-items-center'>
                Đăng nhập <BoxArrowInRight size={20} className='ms-2' />
            </Button>
        </Modal.Footer>
    </Modal>
}
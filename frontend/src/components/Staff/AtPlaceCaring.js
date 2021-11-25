import { useState } from "react"
import { InputGroup, FormControl, Form, Button } from "react-bootstrap"
import { Search, Activity } from 'react-bootstrap-icons'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import { SideLink, activeLink } from '../SideLinkStyle'

export default function AtPlaceCaring() {
    const [active, setActive] = useState(0);

    return <div className='container mt-3'>
        <InputGroup className='mb-3 w-75 mx-auto'>
            <FormControl type='text' placeholder={'Type customer\'s ssn, phone or email'} />
            <InputGroup.Text><Search /></InputGroup.Text>
        </InputGroup>

        <div className='row'>
            <SideBar active={active} setActive={setActive} />
            <BasicInfo active={active} idx={0} />
            <Charts active={active} idx={1} />
        </div>
    </div>
};

function SideBar(props) {
    return <div className='col-3 mt-4'>
        <SideLink className="nav-link" style={0 === props.active ? activeLink : {}}
            onClick={() => props.setActive(0)}>
            Thông tin KH
        </SideLink>
        <SideLink className="nav-link" style={1 === props.active ? activeLink : {}}
            onClick={() => props.setActive(1)}>
            Thống kê
        </SideLink>
    </div>
}

function BasicInfo(props) {
    return <Form className='col-9' style={props.active === props.idx ? {} : { display: 'none' }}>
        <Form.Group>
            <Form.Label>Mã số khách hàng</Form.Label>
            <Form.Control type='text' readOnly />
        </Form.Group>
        <Form.Group>
            <Form.Label>Tên khách hàng</Form.Label>
            <Form.Control type='text' readOnly />
        </Form.Group>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='text' readOnly />
        </Form.Group>
        <div className='row'>
            <Form.Group className='col-6'>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type='text' readOnly />
            </Form.Group>
            <Form.Group className='col-6'>
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control type='text' readOnly />
            </Form.Group>
        </div>
        <div className='row'>
            <Form.Group className='col-6'>
                <Form.Label>Điểm tích luỹ</Form.Label>
                <Form.Control type='text' readOnly />
            </Form.Group>
            <Form.Group className='col-6'>
                <Form.Label>Nhóm khách hàng</Form.Label>
                <Form.Control type='text' readOnly />
            </Form.Group>
        </div>
        <Form.Group className='col-12'>
            <Form.Label>Sở thích khách hàng</Form.Label>
            <Form.Control as='textarea' rows='3' readOnly />
        </Form.Group>
    </Form>
}

function Charts(props) {
    return <div className='col-9' style={props.active === props.idx ? {} : { display: 'none' }}>
        <div className='row align-items-center mb-3 justify-content-center'>
            {/* <h5 className='col-2'>Thống kê theo</h5> */}
            <Form.Group className='col-3'>
                <Form.Select >
                    <option>Tuần</option>
                    <option>Tháng</option>
                    <option>Quý</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className='col-4'>
                <InputGroup>
                    <InputGroup.Text>From</InputGroup.Text>
                    <FormControl type='date' />
                </InputGroup>
            </Form.Group>
            <Form.Group className='col-4'>
                <InputGroup>
                    <InputGroup.Text>To</InputGroup.Text>
                    <FormControl type='date' />
                </InputGroup>
            </Form.Group>
            <div className='col-1'>
                <Button><Activity size={20} /></Button>
            </div>
        </div>
        <hr />
        <div className='row'>
            <div className='col-4 d-flex flex-column align-items-center'>
                <div className='badge bg-secondary fs-6 rounded-pill'>
                    Loại sản phẩm mua nhiều nhất
                </div>
                <Doughnut data={donutData} width='200' height='200' />
            </div>
            <div className='col-8 d-flex flex-column align-items-center'>
                <div className='badge bg-secondary fs-6 rounded-pill'>
                    Số lần mua hàng
                </div>
                <Line data={lineData} options={lineOptions} />
            </div>
            <div className='mx-auto mt-3 mb-3 col-9 d-flex flex-column align-items-center'>
                <div className='badge bg-secondary fs-6 rounded-pill'>
                    Điểm tích luỹ
                </div>
                <Bar data={barData} options={barOptions} />
            </div>
        </div>

    </div>
}

const donutData = {
    labels: ['Quần áo', 'Đồ gia dụng', 'Điện thoại', 'Đồ ăn', 'Sách'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        },
    ],
};

const lineData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
    datasets: [
        {
            label: 'Số lần mua hàng trong tháng',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.7)',
        },
    ],
};

const lineOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};
const barData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
    datasets: [
        {
            label: 'Tổng tiền',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const barOptions = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};
import { useState } from "react"
import { InputGroup, FormControl, Form, Button } from "react-bootstrap"
import { Search, Activity } from 'react-bootstrap-icons'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import { SideLink, activeLink } from '../SideLinkStyle'
import DataService from '../../services/staff.service'

export default function AtPlaceCaring() {
    const [active, setActive] = useState(0);
    const [query, setQuery] = useState('');
    const [cInfo, setCInfo] = useState({
        birthday: "",
        email: "",
        favorite: "",
        fname: "",
        imageUrl: "",
        lname: "",
        phone: "",
        score: '',
        ssn: ''
    })

    const getCustomer = (query) => {
        DataService.getCustomer(query).then(response => {
            if (!response.data[0]) alert('Cannot find customer, please give ssn, phone or email exactly')
            else setCInfo(response.data[0])
        })
    }

    return <div className='container mt-3'>
        <InputGroup className='mb-3 w-75 mx-auto'>
            <FormControl type='text' placeholder={'Type customer\'s ssn, phone or email'}
                value={query} onChange={e => setQuery(e.target.value)}
                onKeyUp={e => {
                    if (e.code === 'Enter' || e.code === 'NumpadEnter') getCustomer(query)

                }} />
            <InputGroup.Text><Search /></InputGroup.Text>
        </InputGroup>

        <div className='row'>
            <SideBar active={active} setActive={setActive} />
            <BasicInfo active={active} idx={0} info={cInfo} />
            <Charts active={active} idx={1} cssn={cInfo.ssn} />
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
    const info = props.info

    return <Form className='col-9' style={props.active === props.idx ? {} : { display: 'none' }}>
        <Form.Group>
            <Form.Label>Mã số khách hàng</Form.Label>
            <Form.Control type='text' readOnly value={info.ssn} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Tên khách hàng</Form.Label>
            <Form.Control type='text' readOnly value={info.lname + ' ' + info.fname} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='text' readOnly value={info.email} />
        </Form.Group>
        <div className='row'>
            <Form.Group className='col-6'>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type='text' readOnly value={info.phone} />
            </Form.Group>
            <Form.Group className='col-6'>
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control type='text' readOnly value={info.birthday} />
            </Form.Group>
        </div>
        <div className='row'>
            <Form.Group className='col-6'>
                <Form.Label>Điểm tích luỹ</Form.Label>
                <Form.Control type='text' readOnly value={info.score} />
            </Form.Group>
            <Form.Group className='col-6'>
                <Form.Label>Nhóm khách hàng</Form.Label>
                <Form.Control type='text' readOnly value={
                    info.score && (info.score < 5000 ? 'Đồng' :
                        (info.score < 10000 ? 'Bạc' : 'Vàng'))
                } />
            </Form.Group>
        </div>
        <Form.Group className='col-12'>
            <Form.Label>Sở thích khách hàng</Form.Label>
            <Form.Control as='textarea' rows='3' readOnly value={info.favorite} />
        </Form.Group>
    </Form>
}

function Charts(props) {
    const [timeUnit, setTimeUnit] = useState('week')
    const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10))
    const [endDate, setEndDate] = useState(new Date().toISOString().substr(0, 10))

    const [donutData, setDonutData] = useState({
        labels: [],
        datasets: [
            {
                label: '# of Votes',
                data: [],
                backgroundColor: []
            },
        ]
    })
    const [lineData, setLineData] = useState({
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
    })

    const [barData, setBarData] = useState({
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        datasets: [
            {
                label: 'Điểm tích luỹ',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                ]
            },
        ],
    })

    const donutStat = () => {
        DataService.getDonutData(props.cssn).then(response => {
            const stat = response.data
            console.log(stat)
            const data = {
                labels: [],
                datasets: [
                    {
                        label: '# of Votes',
                        data: [],
                        backgroundColor: []
                    }
                ]
            }
            stat.forEach((value, index) => {
                data.labels.push(value.categoryName)
                data.datasets[0].data.push(value.buyTimes)
                data.datasets[0].backgroundColor.push(donutBgColor[index])
            })
            setDonutData(data)
        })
    }

    const lineStat = () => {
        const mode = timeUnit
        console.log(mode)
        DataService.getLineData(props.cssn, startDate, endDate, mode).then(response => {
            console.log(response.data)
            const data = {
                labels: [],
                datasets: [
                    {
                        label: 'Số lần mua hàng trong tháng',
                        data: [],
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.7)',
                    }
                ]
            };
            let start, end;
            if (mode === 'week') {
                start = getWeek(startDate)
                end = getWeek(endDate)
            } else if (mode === 'month') {
                start = new Date(startDate).getMonth() + 1
                end = new Date(endDate).getMonth() + 1
            } else if (mode === 'quarter') {
                start = Math.ceil(new Date(startDate).getMonth() / 3)
                end = Math.ceil(new Date(endDate).getMonth() / 3)
            }
            let count = 0;
            const maxCount = response.data.length;
            let num = response.data[count] ? response.data[count][mode].slice(5) : -1
            for (let i = start; i <= end; ++i) {
                data.labels.push(mode.slice(0, 1).toUpperCase() + i)

                if (parseInt(num) === i) {
                    data.datasets[0].data.push(response.data[count].buyTimes)
                    if (count < maxCount - 1) {
                        ++count;
                        num = response.data[count][mode].slice(5)
                    }
                }
                else data.datasets[0].data.push(0)
            }
            setLineData(data)
        }).catch(err => {
            console.log(err)
        })
    }

    const barStat = () => {
        const mode = timeUnit
        console.log(mode)
        DataService.getBarData(props.cssn, startDate, endDate, mode).then(response => {
            console.log(response.data)
            const data = {
                labels: [],
                datasets: [
                    {
                        label: 'Điểm tích luỹ',
                        data: [],
                        backgroundColor: []
                    }
                ]
            };
            let start, end;
            if (mode === 'week') {
                start = getWeek(startDate)
                end = getWeek(endDate)
            } else if (mode === 'month') {
                start = new Date(startDate).getMonth() + 1
                end = new Date(endDate).getMonth() + 1
            } else if (mode === 'quarter') {
                start = Math.ceil(new Date(startDate).getMonth() / 3)
                end = Math.ceil(new Date(endDate).getMonth() / 3)
            }
            let count = 0;
            const maxCount = response.data.length;
            let num = response.data[count] ? response.data[count][mode].slice(5) : -1
            for (let i = start; i <= end; ++i) {
                data.labels.push(mode.slice(0, 1).toUpperCase() + i)
                data.datasets[0].backgroundColor.push(barColor)
                if (parseInt(num) === i) {
                    data.datasets[0].data.push(response.data[count].score)
                    if (count < maxCount - 1) {
                        ++count;
                        num = response.data[count][mode].slice(5)
                    }
                }
                else data.datasets[0].data.push(0)
            }
            setBarData(data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getStat = () => {
        // if (startDate === '') {
        //     alert('You must choose startDate!')
        //     return
        // }
        donutStat()
        lineStat()
        barStat()
    }

    return <div className='col-9' style={props.active === props.idx ? {} : { display: 'none' }}>
        <div className='row align-items-center mb-3 justify-content-center'>
            {/* <h5 className='col-2'>Thống kê theo</h5> */}
            <Form.Group className='col-3'>
                <Form.Select value={timeUnit} onChange={e => { setTimeUnit(e.target.value) }}>
                    <option value='week'>Tuần</option>
                    <option value='month'>Tháng</option>
                    <option value='quarter'>Quý</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className='col-4'>
                <InputGroup>
                    <InputGroup.Text>From</InputGroup.Text>
                    <FormControl type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
                </InputGroup>
            </Form.Group>
            <Form.Group className='col-4'>
                <InputGroup>
                    <InputGroup.Text>To</InputGroup.Text>
                    <FormControl type='date' value={endDate} onChange={e => setEndDate(e.target.value)} />
                </InputGroup>
            </Form.Group>
            <div className='col-1'>
                <Button onClick={getStat}><Activity size={20} /></Button>
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

const getWeek = (date) => {
    const input = new Date(date)
    var oneJan = new Date(input.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((input - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil((input.getDay() + 1 + numberOfDays) / 7);
    return result
}

const donutBgColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)'
]

const barColor = 'rgba(75, 192, 192, 1)';

const lineOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

const barOptions = {
    scales: {
        y: {

            beginAtZero: true
        },
    },
};
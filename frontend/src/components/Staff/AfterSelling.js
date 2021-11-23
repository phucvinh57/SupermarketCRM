import { useState, useEffect } from "react"
import { SideLink, activeLink } from "../SideLinkStyle"
import { FormControl, Table, Form, Button, Modal } from "react-bootstrap";
import { Search, Reply } from "react-bootstrap-icons";
import ReactPaginate from "react-paginate";

import './modal-response.css'

export default function AfterSelling() {
    const [active, setActive] = useState(0);
    return <div className='container-fluid mt-3'>
        <div className='row'>
            <SideBar active={active} setActive={setActive} />
            <CustomerList active={active === 0} items={customersData} numItemsPerPage={10} />
            <FeedbackResponse active={active === 1} items={feedbackData} numItemsPerPage={10} />
            <SendNotifs active={active === 2} />
        </div>
    </div>
}

function SideBar(props) {
    return <div className='col-3 mt-4'>
        <SideLink className="nav-link" style={0 === props.active ? activeLink : {}}
            onClick={() => props.setActive(0)}>
            Danh sách KH
        </SideLink>
        <SideLink className="nav-link" style={1 === props.active ? activeLink : {}}
            onClick={() => props.setActive(1)}>
            Tiếp nhận phản hồi
        </SideLink>
        <SideLink className="nav-link" style={2 === props.active ? activeLink : {}}
            onClick={() => props.setActive(2)}>
            Gửi thông báo
        </SideLink>
    </div>
}

function CustomerList({ numItemsPerPage, items, active }) {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + numItemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / numItemsPerPage));
    }, [itemOffset, numItemsPerPage, items]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * numItemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return <div className='col-9' style={active ? {} : { display: 'none' }}>
        <h4>Danh sách khách hàng</h4>
        <div className='row mb-2'>
            <div className='col-8'>
                <Form.Group>
                    <FormControl type='text' placeholder='Search customer by phone or email...' />
                </Form.Group>
            </div>
            <div className='col-3'>
                <Form.Group>
                    <Form.Select>
                        <option>Đồng</option>
                        <option>Bạc</option>
                        <option>Vàng</option>
                        <option>Tất cả</option>
                    </Form.Select>
                </Form.Group>
            </div>
            <div className='col-1'>
                <Button><Search /></Button>
            </div>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>MSKH</th>
                    <th>Tên KH</th>
                    <th>Ngày sinh</th>
                    <th>Nhóm KH</th>
                    <th>SĐT</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map(value => {
                    return <tr key={value.ssn}>
                        <td>{value.ssn}</td>
                        <td>{value.name}</td>
                        <td>{value.birthday}</td>
                        <td>{value.type}</td>
                        <td>{value.phone}</td>
                        <td>{value.email}</td>
                    </tr>
                })}
            </tbody>
        </Table>
        <div className='float-end mx-1 mt-1' >
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    </div>
}

function FeedbackResponse({ numItemsPerPage, items, active }) {
    const [showFeedback, setShowFeedback] = useState(false)
    const [feedbackContent, setFeedbackContent] = useState('');

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + numItemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / numItemsPerPage));
    }, [itemOffset, numItemsPerPage, items]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * numItemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    const openFeedback = (value) => {
        setFeedbackContent(value)
        setShowFeedback(true)
    }

    return <div className='col-9' style={active ? {} : { display: 'none' }}>
        <h4>Tiếp nhận phản hồi</h4>
        <div className='row mb-2 justify-content-between'>
            <div className='col-5'>
                <Form.Group>
                    <FormControl type='text' placeholder='Search customer by phone or email' />
                </Form.Group>
            </div>
            <div className='col-2'>
                <Form.Group>
                    <Form.Select>
                        <option>Đồng</option>
                        <option>Bạc</option>
                        <option>Vàng</option>
                        <option>Tất cả</option>
                    </Form.Select>
                </Form.Group>
            </div>
            <div className='col-2'>
                <Form.Group>
                    <Form.Select>
                        <option>Gần nhất</option>
                        <option>Muộn nhất</option>
                    </Form.Select>
                </Form.Group>
            </div>
            <div className='col-2'>
                <Form.Group>
                    <Form.Select>
                        <option>Đã trả lời</option>
                        <option>Đang chờ</option>
                    </Form.Select>
                </Form.Group>
            </div>
            <div className='col-1 float-end'>
                <Button><Search /></Button>
            </div>
        </div>
        <div className='row rounded border border-1 p-2 mx-1 bg-dark text-white mb-1'>
            <div className='col-2'>Tiêu đề</div>
            <div className='col-3'>Thời gian</div>
            <div className='col-3'>Tên khách hàng</div>
            <div className='col-2'>Trạng thái</div>
            <div className='col-2'>Rating</div>
        </div>
        {currentItems.map(value => {
            return <div className='row rounded border border-1 p-2 mx-1 mb-1'
                key={value.purchaseId}>
                <div className='col-2 text-primary'><u>{value.title}</u></div>
                <div className='col-3'>{value.time}</div>
                <div className='col-3'>{value.customerName}</div>
                <div className='col-2'>
                    <span className={'badge ' + (value.status ? 'bg-success' : 'bg-secondary')}>
                        {value.status ? 'Đã trả lời' : 'Đang chờ'}
                    </span>
                </div>
                <div className='col-2 d-flex justify-content-between align-items-center'>
                    <div>{value.rating}/5</div>
                    <Reply size={22} onClick={() => openFeedback(value.content)} />
                </div>
            </div>
        })}
        <div className='float-end mx-1 mt-1' >
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>

        <Feedback show={showFeedback} onHide={() => setShowFeedback(false)} content={feedbackContent} />
    </div>
}

function SendNotifs(props) {
    const [content, setContent] = useState('')
    const sendFeedback = () => {
        console.log(content)
    }

    return <div className='col-9' style={props.active ? {} : { display: 'none' }}>
        <Form>
            <Form.Group className="mb-2">
                <Form.Label className='fw-bold'>Tiêu đề:</Form.Label>
                <Form.Control type="text" placeholder="Tiêu đề" required />
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label className='fw-bold'>Gửi đến:</Form.Label>
                <Form.Select>
                    <option>Khách hàng đồng</option>
                    <option>Khách hàng bạc</option>
                    <option>Khách hàng vàng</option>
                    <option>Tất cả khách hàng</option>
                </Form.Select>
            </Form.Group>

            <div className='row'>
                <Form.Group className='mb-2 col-6'>
                    <Form.Label className='fw-bold'>Link đính kèm</Form.Label>
                    <Form.Control type='url' />
                </Form.Group>
                <Form.Group className='mb-2 col-6'>
                    <Form.Label className='fw-bold'>Ảnh</Form.Label>
                    <Form.Control type='file' />
                </Form.Group>
            </div>

            <Form.Group className='mb-2'>
                <Form.Label className='fw-bold'>Nội dung thông báo</Form.Label>
                <Form.Control as='textarea' rows={8} value={content}
                    onChange={(e) => setContent(e.target.value)} />
            </Form.Group>

            <div className='d-flex justify-content-end'>
                <Button onClick={sendFeedback}>Gửi</Button>
            </div>
        </Form>
    </div>
}

function Feedback(props) {
    const [reply, setReply] = useState('');

    return <Modal size='xl' centered {...props} contentClassName='modal-response'>
        <Modal.Header closeButton>
            <Modal.Title>
                Nội dung feedback <u>Quần áo</u>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row' style={{ height: '250px' }}>
                <Form.Group className='col-6' style={{ height: '100%' }}>
                    <Form.Label>Nội dung phản hồi</Form.Label>
                    <Form.Control as='textarea' value={props.content} row={15}
                        style={{ height: '90%' }} readOnly />
                </Form.Group>
                <Form.Group className='col-6' style={{ height: '100%' }}>
                    <Form.Label>Trả lời phản hồi</Form.Label>
                    <Form.Control as='textarea' value={reply} row={15} style={{ height: '90%' }}
                        onChange={e => setReply(e.target.value)} />
                </Form.Group>
            </div>

        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide} className='d-flex align-items-center'>
                <Reply size={20} className='me-2' /> Trả lời
            </Button>
        </Modal.Footer>
    </Modal>
}

const customersData = [{
    ssn: '1915940',
    name: 'Nguyễn Phúc Vinh',
    birthday: '05/07/2001',
    type: 'Vàng',
    phone: '0373 395 726',
    email: 'phucvinh57@gmail.com'
}, {
    ssn: '1919191',
    name: 'Vương Thanh Duyên',
    birthday: '10/10/2001',
    type: 'Bạc',
    phone: '0383 553 052',
    email: 'vtduyen@gmail.com'
}, {
    ssn: '1915940',
    name: 'Lê Nghĩa',
    birthday: '11/11/2001',
    type: 'Đồng',
    phone: '0963 145 368',
    email: 'nghia.le@gmail.com'
}]

const feedbackData = [{
    title: 'Máy tính',
    time: new Date().toLocaleString(),
    customerName: 'Nguyễn Phúc Vinh',
    rating: 5,
    status: false,
    content: 'Pin ổn, làm việc được 1 ngày ko cần sạc'
}, {
    title: 'Quần áo',
    time: new Date().toLocaleString(),
    customerName: 'Vương Thanh Duyên',
    rating: 3,
    status: true,
    content: 'Quần áo bị giãn chun sau 1 tháng mặc'
}, {
    title: 'Thịt đông lạnh',
    time: new Date().toLocaleString(),
    customerName: 'Lê Nghĩa',
    rating: 4,
    status: true,
    content: ''
}]
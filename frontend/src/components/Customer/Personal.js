import { useState, useEffect } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap'
import styled from 'styled-components'
import { Eye, Trash } from 'react-bootstrap-icons'
import ReactPaginate from 'react-paginate'
import { SideLink, activeLink } from '../SideLinkStyle';
const avatarLink = `https://vcdn-giaitri.vnecdn.net/2021/09/16/the-godfather-1-1375687021-500-2676-4881-1631806006.jpg`


export default function Personal() {
    const [active, setActive] = useState(0);
    return <div className='row pt-2'>
        <SideBar active={active} setActive={setActive} />
        <PersonalInfo active={0 === active} />
        <ShoppingHistory active={1 === active} items={histories} numItemsPerPage={10} />
        <FavourWarehouse active={2 === active} />
    </div>
}

function SideBar(props) {
    return <div className='col-3 mt-4'>
        <SideLink className="nav-link" style={0 === props.active ? activeLink : {}}
            onClick={() => props.setActive(0)}>
            Thông tin cá nhân
        </SideLink>
        <SideLink className="nav-link" style={1 === props.active ? activeLink : {}}
            onClick={() => props.setActive(1)}>
            Lịch sử mua sắm
        </SideLink>
        <SideLink className="nav-link" style={2 === props.active ? activeLink : {}}
            onClick={() => props.setActive(2)}>
            Ưu đãi/Voucher
        </SideLink>
    </div>
}

function PersonalInfo(props) {
    return <div className='col-9 row justify-content-between' style={!props.active ? { display: 'none' } : {}}>
        <h4>Hồ sơ khách hàng</h4>
        <Form className='col-8'>
            <Form.Group className="mb-1" controlId="ssn">
                <Form.Label>Mã khách hàng</Form.Label>
                <Form.Control type="text" placeholder="Name" value='1azw6zxc' readOnly />
            </Form.Group>

            <div className='row'>
                <Form.Group className="mb-1 col-6" controlId="fName">
                    <Form.Label>Họ</Form.Label>
                    <Form.Control type="text" placeholder="First name" required />
                </Form.Group>
                <Form.Group className="mb-1 col-6" controlId="lName">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control type="text" placeholder="Last name" required />
                </Form.Group>
            </div>

            <div className='row'>
                <Form.Group className="mb-1 col-6" controlId="emailAddr">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        Email của khách hàng sẽ không bị tiết lộ.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-1 col-6" controlId="phoneNumber">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="tel" placeholder="Số điện thoại" required />
                </Form.Group>
            </div>

            <div className='row'>
                <Form.Group className="mb-1 col-6" controlId="birthday">
                    <Form.Label>Ngày sinh</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>
                <Form.Group className="mb-1 col-6" controlId="score">
                    <Form.Label>Điểm tích luỹ</Form.Label>
                    <Form.Control type="text" value={5336} readOnly />
                </Form.Group>
            </div>

            <Form.Group className='mb-3' controlId="favourite">
                <Form.Label>Quan tâm, sở thích</Form.Label>
                <Form.Control as="textarea" style={{ height: '100px' }} />
            </Form.Group>

            <div className='d-flex justify-content-between'>
                <Button className="fw-bold btn-danger">Reset</Button>
                <Button className="fw-bold btn-success">Save</Button>
            </div>
        </Form>

        <Form.Group className='col-4 d-flex flex-column justify-content-center' controlId="avatarImage">
            <Image src={avatarLink} alt='avatar' className='mb-3' />
            <Form.Control type='file' />
        </Form.Group>
    </div>
}

const histories = [{
    purchaseId: "za5x2q",
    timestamp: new Date().toLocaleString(),
    sBranchName: "Chi nhánh Thủ Đức",
    totalAmount: '500 000đ',
    totalScore: 100
}, {
    purchaseId: "a2xw6a",
    timestamp: new Date().toLocaleString(),
    sBranchName: "Chi nhánh Bình Dương",
    totalAmount: '1000 000đ',
    totalScore: 200
}, {
    purchaseId: "56ae9z",
    timestamp: new Date().toLocaleString(),
    sBranchName: "Chi nhánh Bình Dương",
    totalAmount: '200 000đ',
    totalScore: 50
}, {
    purchaseId: "sw45s6",
    timestamp: new Date().toLocaleString(),
    sBranchName: "Chi nhánh Bình Dương",
    totalAmount: '1000 000đ',
    totalScore: 100
}]

function ShoppingHistory({ numItemsPerPage, items, active }) {
    const [showDetail, setShowDetail] = useState(false)
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

    const openModal = () => {
        setShowDetail(true);
        console.log("Open modal ...")
    }

    return <div className='col-9' style={!active ? { display: 'none' } : {}}>
        <h4>Lịch sử mua sắm</h4>
        <div className='row px-1 mb-2'>
            <Form.Group className='col-7'>
                <Form.Control type="text" placeholder="Search for purchase" />
            </Form.Group>
            <Form.Group className='col-3' >
                <Form.Select>
                    <option>Thời gian</option>
                    <option>Điểm tích luỹ</option>
                    <option>Tổng tiền</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className='col-2' >
                <Form.Select>
                    <option>Tăng</option>
                    <option>Giảm</option>
                </Form.Select>
            </Form.Group>
        </div>
        <div className='row rounded border border-1 p-2 mx-1 bg-dark text-white mb-1'>
            <div className='col-2'>Mã đơn hàng</div>
            <div className='col-3'>Thời gian</div>
            <div className='col-3'>Chi nhánh</div>
            <div className='col-2'>Tổng tiền</div>
            <div className='col-2'>Tích luỹ</div>
        </div>

        {currentItems.map(value => {
            return <div className='row rounded border border-1 p-2 mx-1 justify-content-between mb-1'
                key={value.purchaseId}>
                <div className='col-2 text-primary'><u>#{value.purchaseId}</u></div>
                <div className='col-3'>{value.timestamp}</div>
                <div className='col-3'>{value.sBranchName}</div>
                <div className='col-2'>{value.totalAmount}</div>
                <div className='col-2 d-flex justify-content-between align-items-center'>
                    <span>{value.totalScore}</span>
                    <ViewDetail size={22} onClick={openModal} />
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

        <PurchaseDetail show={showDetail} onHide={() => setShowDetail(false)} />
    </div>
}

const favourList = [{
    code: "za5x2q",
    description: "Giảm giá 20% cho tất cả đơn hàng",
    startDate: new Date().toLocaleString(),
    endDate: new Date().toLocaleString(),
    discount: '20%'
}, {
    code: "qw2a6w",
    description: "Giảm giá 500k cho các đồ điện tử có giá trị > 10 triệu",
    startDate: new Date().toLocaleString(),
    endDate: new Date().toLocaleString(),
    discount: '500 000đ'
}]

function FavourWarehouse(props) {
    return <div className='col-9 justify-content-between' style={!props.active ? { display: 'none' } : {}}>
        <h4>Kho lưu trữ ưu đãi</h4>
        <div className='row rounded border border-1 p-2 mx-1 bg-dark text-white mb-1'>
            <div className='col-1'>Code</div>
            <div className='col-3'>Mô tả</div>
            <div className='col-3'>Ngày áp dụng</div>
            <div className='col-3'>Ngày hết hạn</div>
            <div className='col-2'>Giảm</div>
        </div>
        {favourList.map(value => {
            return <div className='row rounded border border-1 p-2 mx-1 mb-1 align-items-center'>
                <div className='col-1'>{value.code}</div>
                <div className='col-3'>{value.description}</div>
                <div className='col-3'>{value.startDate}</div>
                <div className='col-3'>{value.endDate}</div>
                <div className='col-2 d-flex justify-content-between'>
                    <div>{value.discount}</div>
                    <Trash size={16}/>
                </div>
            </div>
        })}
    </div>
}

function PurchaseDetail(props) {
    return <Modal size='lg' centered {...props} fullscreen>
        <Modal.Header closeButton>
            <Modal.Title>
                Chi tiết đơn hàng <u>axq56a</u>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Danh sách sản phẩm</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên</th>
                        <th>Nguồn gốc</th>
                        <th>NSX</th>
                        <th>HSD</th>
                        <th>Đơn giá</th>
                        <th>Giảm giá</th>
                        <th>Số lượng</th>
                        <th>Tích luỹ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1424</td>
                        <td>Kệ đặt dép</td>
                        <td>Việt Nam</td>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td></td>
                        <td>60 000đ</td>
                        <td>5%</td>
                        <td>2</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>1424</td>
                        <td>Kệ đặt dép</td>
                        <td>Việt Nam</td>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td></td>
                        <td>60 000đ</td>
                        <td>5%</td>
                        <td>2</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>1424</td>
                        <td>Kệ đặt dép</td>
                        <td>Việt Nam</td>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td></td>
                        <td>60 000đ</td>
                        <td>5%</td>
                        <td>2</td>
                        <td>20</td>
                    </tr>
                </tbody>
            </Table>
            <div className='float-end d-flex flex-column align-items-start fw-bold'>
                <div className='mb-2'>Tổng giá trị: <span className='badge bg-danger fs-6'>{'500 000đ'}</span></div>
                <div>Tổng điểm tích luỹ: <span className='badge bg-success fs-6'>{'50'}</span></div>
            </div>
            <h5>Nơi mua hàng</h5>
            <div>Chi nhánh Thủ Đức</div>
            <div>4D, Trần Thị Vững, p.An Bình, Dĩ An, Bình Dương</div>
            <div>0373 395 726</div>
            <h5 className='mt-3'>Thời gian</h5>
            <div>{new Date().toLocaleString()}</div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Đóng</Button>
        </Modal.Footer>
    </Modal>
}

const ViewDetail = styled(Eye)`
    color: gray;
    :hover {
        cursor: pointer;
        color: black;
    }
`;

const Image = styled.img`
    width: 300px;
    align-self: center;
`;
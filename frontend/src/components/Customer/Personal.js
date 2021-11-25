import { useState, useEffect } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap'
import styled from 'styled-components'
import { Eye, Trash } from 'react-bootstrap-icons'
import ReactPaginate from 'react-paginate'
import DataService from '../../services/customer.service'

import { SideLink, activeLink } from '../SideLinkStyle';

export default function Personal() {
    const [active, setActive] = useState(0);
    return <div className='row pt-2'>
        <SideBar active={active} setActive={setActive} />
        <PersonalInfo active={0 === active} />
        <ShoppingHistory active={1 === active} numItemsPerPage={2} />
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
    const [info, setInfo] = useState({
        ssn: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        birthday: new Date(),
        imageUrl: '',
        score: '',
        favorite: ''
    })

    const handleFirstName = (e) => {
        setInfo({ ...info, fname: e.target.value })
    }
    const handleLastName = (e) => {
        setInfo({ ...info, lname: e.target.value })
    }
    const handleEmail = (e) => {
        setInfo({ ...info, email: e.target.value })
    }
    const handlePhone = (e) => {
        setInfo({ ...info, phone: e.target.value })
    }
    const handleBirthday = (e) => {
        setInfo({ ...info, birthday: e.target.value })
    }
    const handleFavorite = (e) => {
        setInfo({ ...info, favorite: e.target.value })
    }
    const handleImageURL = (e) => {
        setInfo({ ...info, imageUrl: e.target.value })
    }

    const updateInfo = () => {
        DataService.updatePersonalInfo(info)
            .then(response => {
                alert(response.data.msg)
            })
    }

    const fetchData = () => {
        DataService.getPersonalInfo('333344445')
            .then(response => {
                // console.log(response.data[0])
                if (response.data.length !== 0)
                    setInfo(response.data[0])
            }).catch(err => console.log(err))
    }

    useEffect(fetchData, [])

    return <div className='col-9 row justify-content-between' style={!props.active ? { display: 'none' } : {}}>
        <h4>Hồ sơ khách hàng</h4>
        <Form className='col-8'>
            <Form.Group className="mb-1" controlId="ssn">
                <Form.Label>Mã khách hàng</Form.Label>
                <Form.Control type="text" placeholder="Name" value={info.ssn} readOnly />
            </Form.Group>

            <div className='row'>
                <Form.Group className="mb-1 col-6" controlId="lName">
                    <Form.Label>Họ</Form.Label>
                    <Form.Control type="text" placeholder="Last name"
                        value={info.lname} required onChange={handleLastName} />
                </Form.Group>
                <Form.Group className="mb-1 col-6" controlId="fName">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control type="text" placeholder="First name" value={info.fname}
                        onChange={handleFirstName} required />
                </Form.Group>
            </div>

            <div className='row'>
                <Form.Group className="mb-1 col-6" controlId="emailAddr">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={info.email}
                        onChange={handleEmail} required />
                    <Form.Text className="text-muted">
                        Email của khách hàng sẽ không bị tiết lộ.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-1 col-6" controlId="phoneNumber">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="tel" placeholder="Số điện thoại" value={info.phone}
                        onChange={handlePhone} required />
                </Form.Group>
            </div>

            <div className='row'>
                <Form.Group className="mb-1 col-6" controlId="birthday">
                    <Form.Label>Ngày sinh</Form.Label>
                    <Form.Control type="date" value={String(info.birthday).substr(0, 10)}
                        onChange={handleBirthday} />
                </Form.Group>
                <Form.Group className="mb-1 col-6" controlId="score">
                    <Form.Label>Điểm tích luỹ</Form.Label>
                    <Form.Control type="text" value={info.score} readOnly />
                </Form.Group>
            </div>

            <Form.Group className='mb-3' controlId="favourite">
                <Form.Label>Quan tâm, sở thích</Form.Label>
                <Form.Control as="textarea" style={{ height: '100px' }} value={info.favorite === null ? '' : info.favorite}
                    onChange={handleFavorite} />
            </Form.Group>

            <div className='d-flex justify-content-between'>
                <Button className="fw-bold btn-danger" onClick={fetchData}>Reset</Button>
                <Button className="fw-bold btn-success" onClick={updateInfo}>Save</Button>
            </div>
        </Form>

        <Form.Group className='col-4 d-flex flex-column justify-content-center' controlId="avatarImage">
            <Image src={info.imageUrl} alt='avatar' className='mb-3' />
            <Form.Control type='url' value={info.imageUrl} onChange={handleImageURL} />
        </Form.Group>
    </div>
}

function ShoppingHistory({ numItemsPerPage, active }) {
    const [histories, setHistories] = useState([{
        purchaseID: "",
        time: '',
        branchName: "",
        branchHotline: '',
        branchAddr: '',
        price: 0,
        score: 0
    }]);

    const [purchaseDetail, setPurchaseDetail] = useState({
        inherit: {},
        data: []
    })

    const [showDetail, setShowDetail] = useState(false)

    const [numOfItems, setNumOfItems] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * numItemsPerPage) % numOfItems;
        setItemOffset(newOffset);
    };

    const fetchData = () => {
        DataService.getPurchases(itemOffset, numItemsPerPage).then(response => {
            setHistories(response.data[0])
        })
        DataService.getNumberOfPurchases().then(response => {
            setNumOfItems(response.data[0].length)
            setPageCount(Math.ceil(response.data[0].length / numItemsPerPage))
        })
    }

    useEffect(fetchData, [itemOffset, numItemsPerPage, numOfItems])

    const openModal = (purchaseID, inherit) => {
        setShowDetail(true);
        DataService.getPurchaseDetail(purchaseID).then(response => {
            const pDetail = {
                inherit: inherit,
                data: response.data
            }
            setPurchaseDetail(pDetail)
            console.log(response.data)
        })
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

        {histories.map(value => {
            return <div className='row rounded border border-1 p-2 mx-1 justify-content-between mb-1 align-items-center'
                key={value.purchaseID}>
                <div className='col-2 text-primary'><u>#{value.purchaseID}</u></div>
                <div className='col-3'>{value.time}</div>
                <div className='col-3'>{value.branchName}</div>
                <div className='col-2'>{value.price}</div>
                <div className='col-2 d-flex justify-content-between align-items-center'>
                    <span>{value.score}</span>
                    <ViewDetail size={22} onClick={() => openModal(value.purchaseID, {
                        totalPrice: value.price,
                        totalScore: value.score,
                        branchName: value.branchName,
                        branchAddr: value.branchAddr,
                        branchHotline: value.branchHotline,
                        time: value.time
                    })} />
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

        <PurchaseDetail show={showDetail} onHide={() => setShowDetail(false)} data={purchaseDetail} />
    </div>
}
function PurchaseDetail(props) {
    const inherit = props.data.inherit
    const data = props.data.data;

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
                    {data.map(value => {
                        return <tr key={value.productID}>
                            <td>{value.productID}</td>
                            <td>{value.productName}</td>
                            <td>{value.origin}</td>
                            <td>{value.mDate}</td>
                            <td>{value.eDate}</td>
                            <td>{value.price}</td>
                            <td>{value.discount}</td>
                            <td>{value.numberOfProducts}</td>
                            <td>{value.score}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <div className='float-end d-flex flex-column align-items-start fw-bold'>
                <div className='mb-2'>Tổng giá trị: <span className='badge bg-danger fs-6'>{inherit.totalPrice + ' VNĐ'}</span></div>
                <div>Tổng điểm tích luỹ: <span className='badge bg-success fs-6'>{inherit.totalScore}</span></div>
            </div>
            <h5>Nơi mua hàng</h5>
            <div>{inherit.branchName}</div>
            <div>{inherit.branchAddr}</div>
            <div>{inherit.branchHotline}</div>
            <h5 className='mt-3'>Thời gian</h5>
            <div>{inherit.time}</div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Đóng</Button>
        </Modal.Footer>
    </Modal>
}


function FavourWarehouse(props) {
    const [list, setList] = useState([{
        code: '',
        content: '',
        startDate: '',
        endDate: '',
        discount: ''
    }]);

    const removeFavour = (code) => {
        DataService.removeFavour(code).then(response => {
            console.log(response.data)
            const newList = [...list]
            const idx = newList.findIndex(value => value.code === code);
            newList.splice(idx, 1)
            setList(newList)
        })
    }

    useEffect(() => {
        DataService.getFavourList().then(response => {
            setList(response.data)
        })
    }, [])

    return <div className='col-9 justify-content-between' style={!props.active ? { display: 'none' } : {}}>
        <h4>Kho lưu trữ ưu đãi</h4>
        <div className='row rounded border border-1 p-2 mx-1 bg-dark text-white mb-1'>
            <div className='col-1'>Code</div>
            <div className='col-3'>Mô tả</div>
            <div className='col-2'>Loại</div>
            <div className='col-2'>Ngày áp dụng</div>
            <div className='col-2'>Ngày hết hạn</div>
            <div className='col-2'>Giảm</div>
        </div>
        {list.map(value => {
            return <div className='row rounded border border-1 p-2 mx-1 mb-1 align-items-center' key={value.code}>
                <div className='col-1'>{value.code}</div>
                <div className='col-3'>{value.content}</div>
                <div className='col-2'>{value.type}</div>
                <div className='col-2'>{value.startDate}</div>
                <div className='col-2'>{value.endDate}</div>
                <div className='col-2 d-flex justify-content-between'>
                    <div>{value.discount}</div>
                    <Trash size={16} onClick={() => removeFavour(value.code)} style={{ cursor: 'pointer' }} />
                </div>
            </div>
        })}
    </div>
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
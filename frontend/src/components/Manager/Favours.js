import { useState, useEffect } from "react"
import { Form, Button, Table, Modal } from "react-bootstrap";
import { Search, Plus, Pencil, Save, Trash, Backspace, ClipboardPlus } from "react-bootstrap-icons";
import ReactPaginate from "react-paginate";

export default function Favours() {
    const [option, setOption] = useState(0);
    // Hiện hoặc ẩn box
    const [showFavour, setShowFavour] = useState(false)
    // Thêm hoặc chỉnh sửa
    const [favourMode, setFavourMode] = useState('')

    const editFavour = () => {
        setShowFavour(true)
        setFavourMode('Chỉnh sửa ưu đãi')
    }

    const addFavour = () => {
        setShowFavour(true)
        setFavourMode('Thêm ưu đãi')
    }

    return <div className='container w-75'>
        <div className='row'>
            <div className='col-6 mx-auto mt-2 mb-2'>
                <Options option={option} setOption={setOption} />
            </div>
            <hr />
            <div className='row mb-3 mx-auto'>
                <Form.Group className='col-6'>
                    <Form.Control type='text' />
                </Form.Group>
                <Form.Group className='col-3'>
                    <Form.Select>
                        <option>Mức giảm giá</option>
                        <option>Ngày bắt đầu</option>
                        <option>Ngày kết thúc</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='col-2'>
                    <Form.Select>
                        <option>Tăng</option>
                        <option>Giảm</option>
                    </Form.Select>
                </Form.Group>
                <div className='col-1'>
                    <Button><Search /></Button>
                </div>
            </div>
            <hr />
            <FavourTable items={favourData} numItemsPerPage={10} addFavour={addFavour} editFavour={editFavour} />
        </div>
        <FavourDetail show={showFavour} onHide={() => setShowFavour(false)} title={favourMode} />
    </div>
}

function Options({ option, setOption }) {
    return <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
            <button className={"fw-bold " + (option === 0 ? "nav-link active" : "nav-link text-dark")} href="#"
                onClick={() => setOption(0)}>
                Quá hạn
            </button>
        </li>
        <li className="nav-item">
            <button className={"fw-bold " + (option === 1 ? "nav-link active" : "nav-link text-dark")} href="#"
                onClick={() => setOption(1)}>
                Đang áp dụng
            </button>
        </li>
        <li className="nav-item">
            <button className={"fw-bold " + (option === 2 ? "nav-link active" : "nav-link text-dark")} href="#"
                onClick={() => setOption(2)}>
                Dự kiến
            </button>
        </li>
    </ul>
}

function FavourTable({ numItemsPerPage, items, addFavour, editFavour }) {
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

    return <div className='mt-0'>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Tên</th>
                    <th>Loại</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Giảm giá</th>
                    <th>SL còn lại</th>
                    <th>
                        <Plus className='border border-1 rounded p-1' size={26}
                            onClick={addFavour} />
                    </th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map(value => {
                    return <tr key={value.ID}>
                        <td><u>{value.ID}</u></td>
                        <td>{value.name}</td>
                        <td>{value.type}</td>
                        <td>{value.startDate}</td>
                        <td>{value.endDate}</td>
                        <td>{value.discount}</td>
                        <td>{value.quantity}</td>
                        <td>
                            <Pencil className='border border-1 rounded p-1' size={26}
                                onClick={editFavour} />
                        </td>
                    </tr>
                })}
            </tbody>
        </Table>
        <div className='float-end mx-1' >
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

function FavourDetail(props) {
    const [name, setName] = useState(favourData[0].name)
    return <Modal size='lg' {...props} centered>
        <Modal.Header closeButton>
            <Modal.Title>
                {props.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row'>
                <Form.Group className='mb-1'>
                    <Form.Label>Tên:</Form.Label>
                    <Form.Control type='text' required value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className='col-6 mb-1'>
                    <Form.Label className='text-danger fw-bold'>Trạng thái:</Form.Label>
                    <Form.Select required>
                        <option>Quá hạn</option>
                        <option>Đang áp dụng</option>
                        <option>Dự kiến</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='col-6 mb-1'>
                    <Form.Label>Loại:</Form.Label>
                    <Form.Select required>
                        <option>Voucher</option>
                        <option>Coupon</option>
                        <option>Sale</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='col-6 mb-1'>
                    <Form.Label>Ngày bắt đầu:</Form.Label>
                    <Form.Control type='date' required />
                </Form.Group>
                <Form.Group className='col-6 mb-1'>
                    <Form.Label>Ngày kết thúc:</Form.Label>
                    <Form.Control type='date' required />
                </Form.Group>
                <Form.Group className='col-6 mb-1'>
                    <Form.Label>Giảm giá:</Form.Label>
                    <Form.Control type='text' required />
                </Form.Group>
                <Form.Group className='col-6 mb-1'>
                    <Form.Label>Số lượng:</Form.Label>
                    <Form.Control type='number' required />
                </Form.Group>
            </div>
        </Modal.Body>
        {props.title === 'Chỉnh sửa ưu đãi' ?
            <Modal.Footer className='justify-content-between'>
                <Button className='d-flex align-items-center btn-danger float-start'>
                    Xoá <Trash size={20} className='ms-2' />
                </Button>
                <Button className='d-flex align-items-center'>
                    Lưu <Save size={20} className='ms-2' />
                </Button>
            </Modal.Footer>
            : <Modal.Footer className='justify-content-between'>
                <Button className='d-flex align-items-center btn-secondary float-start'>
                    Huỷ bỏ <Backspace size={20} className='ms-2' />
                </Button>
                <Button className='d-flex align-items-center'>
                    Thêm <ClipboardPlus size={20} className='ms-2' />
                </Button>
            </Modal.Footer>}
    </Modal>
}

const favourData = [{
    ID: 142436,
    name: 'Voucher Giáng sinh',
    type: 'Voucher',
    startDate: new Date().toLocaleDateString(),
    endDate: new Date().toLocaleDateString(),
    discount: '50%',
    quantity: 125
}, {
    ID: 191594,
    name: 'Coupon 20/11',
    type: 'Coupon',
    startDate: new Date().toLocaleDateString(),
    endDate: new Date().toLocaleDateString(),
    discount: '100 000đ',
    quantity: 1675
}, {
    ID: 159786,
    name: 'Giảm giá cuối năm',
    type: 'Sale',
    startDate: new Date().toLocaleDateString(),
    endDate: new Date().toLocaleDateString(),
    discount: '50%',
    quantity: ''
}]
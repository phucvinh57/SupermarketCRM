import { useState, useEffect } from "react"
import { Table, InputGroup, FormControl, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import ReactPaginate from "react-paginate";

export default function Products() {
    return <div className='container'>
        <div className='row'>
            <Form.Group className='mt-3'>
                <InputGroup>
                    <FormControl type='text' placeholder='Search by product name or ID ...' />
                    <InputGroup.Text><Search /></InputGroup.Text>
                </InputGroup>
            </Form.Group>
            <ProductTable items={productData} numItemsPerPage={10} />
        </div>

    </div>
}

function ProductTable({ items, numItemsPerPage }) {
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

    return <div className='mt-3'>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Tên</th>
                    <th>Loại SP</th>
                    <th>NSX</th>
                    <th>HSD</th>
                    <th>Xuất xứ</th>
                    <th>Giá</th>
                    <th>Ưu đãi</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map(value => {
                    return <tr key={value.ID}>
                        <td><u>{value.ID}</u></td>
                        <td>{value.name}</td>
                        <td>{value.type}</td>
                        <td>{value.mDate}</td>
                        <td>{value.eDate}</td>
                        <td>{value.origin}</td>
                        <td>{value.price}</td>
                        <td>{<u>{value.favour}</u>}</td>
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

const productData = [{
    ID: 142436,
    name: 'Quần jean co dãn',
    type: 'Quần áo',
    mDate: new Date().toLocaleDateString(),
    eDate: new Date().toLocaleDateString(),
    favour: '',
    origin: 'Việt Nam',
    price: '500 000đ'
}, {
    ID: 156478,
    name: 'Kệ đựng dép',
    type: 'Đồ gia dụng',
    mDate: new Date().toLocaleDateString(),
    eDate: new Date().toLocaleDateString(),
    favour: '142436',
    origin: 'Việt Nam',
    price: '80 000đ'
}, {
    ID: 624569,
    name: 'Laptop Lenovo Thinkpad',
    type: 'Đồ điện tử',
    mDate: new Date().toLocaleDateString(),
    eDate: new Date().toLocaleDateString(),
    favour: '',
    origin: 'Japan',
    price: '18 000 000đ'
}]
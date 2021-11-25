import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactPaginate from 'react-paginate'
import DataService from '../../services/customer.service'

export default function Notifications({ numItemsPerPage }) {
    const [notifs, setNotifs] = useState([{
        imageUrl: '',
        title: '',
        url: '',
        content: '',
        time: ''
    }])

    const [numOfItems, setNumOfItems] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * numItemsPerPage) % numOfItems;
        setItemOffset(newOffset);
    };

    const fetchData = () => {
        DataService.getNotifications(itemOffset, numItemsPerPage).then(response => {
            // console.log(response.data[0])
            setNotifs(response.data[0])
        })
        DataService.getNumberOfNotifs().then(response => {
            setNumOfItems(response.data[0].length)
            setPageCount(Math.ceil(response.data[0].length / numItemsPerPage))
            // console.log()
        })
    }

    useEffect(fetchData, [itemOffset, numItemsPerPage, numOfItems]);

    return <div className='container mt-3' style={{ width: '70%' }}>
        <h4>Thông báo</h4>
        {notifs.map(value => {
            return <div className='row rounded border border-1 p-2 mx-1 mb-1 align-items-center' key={value.title}>
                <div className='col-4'>
                    <Image src={value.imageUrl} alt='img' />
                </div>
                <div className='col-8'>
                    <h6>{value.title}</h6>
                    <div>{value.content}</div>
                    <a href={value.url} className='float-end'>Chi tiết</a>
                </div>
            </div>
        })}
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

const Image = styled.img`
    width: 100%;
    align-self: center;
`;
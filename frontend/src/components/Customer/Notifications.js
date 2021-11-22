import styled from 'styled-components'

export default function Notifications() {
    return <div className='container mt-3' style={{ width: '70%' }}>
        <h4>Thông báo</h4>
        {notifList.map(value => {
            return <div className='row rounded border border-1 p-2 mx-1 mb-1 align-items-center' key={value.title}>
                <div className='col-4'>
                    <Image src={value.imageURL} alt='img' />
                </div>
                <div className='col-8'>
                    <h6>{value.title}</h6>
                    <div>Thời gian: Từ ngày <b>{value.startTime}</b> đến ngày <b>{value.endTime}</b></div>
                    <div>Đối tượng áp dụng: {value.target}</div>
                    <p>{value.content}</p>
                    <a href={value.detail} className='float-end'>Chi tiết</a>
                </div>
            </div>
        })}

    </div>
}

const notifList = [{
    imageURL: `https://www.uuviet.com/vi/media/image/MediaCategory/media_attachment/2412/nem-uu-viet-lo-xo-cao-su-khuyen-mai-cuoi-nam-uu-dai.jpg`,
    title: 'Ưu đãi cuối năm',
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    target: `Tất cả khách hàng`,
    content: `Giảm giá 20% cho tất cả các đơn hàng có giá trị trên 1 triệu`,
    detail: 'https://www.uuviet.com/tin-tuc/cuoi-nam-ron-rang-muon-van-uu-dai'
}, {
    imageURL: 'https://cdn.tgdd.vn/Files/2020/11/18/1307714/hotsale-cuoi-tuan-20-11-mung-ngay-nha-giao-viet-n-1-760x367.png',
    title: 'Ưu đãi 20/11',
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    target: `Khách hàng Bạc`,
    content: `Giảm giá 10% cho tất cả quà tặng 20/11`,
    detail: 'https://www.dienmayxanh.com/khuyen-mai/hotsale-cuoi-tuan-20-11-mung-ngay-nha-giao-viet-n-1307714'
}]

const Image = styled.img`
    width: 100%;
    align-self: center;
`;
import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import ReactStars from "react-rating-stars-component"
import DataService from '../../services/customer.service'

export default function Feedback() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [stars, setStars] = useState('0')

    const sendFeedback = () => {
        DataService.sendFeedback({
            title: title,
            content: content,
            stars: stars
        }).then(response => {
            alert(response.data.message)
            setTitle('')
            setContent('')
            setStars(0)
        })
    }
    
    return <div className='container mt-3' style={{ width: '70%' }}>
        <Form>
            <Form.Group className="mb-1" controlId="title">
                <Form.Label className='fw-bold'>Tiêu đề:</Form.Label>
                <Form.Control type="text" placeholder="Tiêu đề" value={title}
                    onChange={e => setTitle(e.target.value)} required/>
            </Form.Group>

            <Form.Group className='mb-1' controlId="favourite">
                <Form.Label className='fw-bold'>Nội dung phản hồi:</Form.Label>
                <Form.Control as='textarea' rows={12} value={content} 
                    onChange={(e) => setContent(e.target.value)} required/>
            </Form.Group>

            <div className='d-flex justify-content-between'>
                <Form.Text className="text-muted">
                    Mọi thắc mắc cần được giải đáp, xin hãy liên hệ với chúng tôi.
                </Form.Text>
                <ReactStars count={5} size={40} activeColor="#ffd700" value={stars}
                    onChange={(value) => setStars(value)} />
            </div>
            <div className='d-flex justify-content-end'>
                <Button onClick={sendFeedback}>Gửi</Button>
            </div>
        </Form>
    </div>
}
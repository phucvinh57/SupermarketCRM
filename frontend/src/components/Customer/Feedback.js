import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import ReactStars from "react-rating-stars-component"

export default function Feedback() {
    const [content, setContent] = useState('')
    const sendFeedback = () => {
        console.log(content)
    }
    
    return <div className='container mt-3' style={{ width: '70%' }}>
        <Form>
            <Form.Group className="mb-1" controlId="title">
                <Form.Label className='fw-bold'>Tiêu đề:</Form.Label>
                <Form.Control type="text" placeholder="Tiêu đề" />
            </Form.Group>

            <Form.Group className='mb-1' controlId="favourite">
                <Form.Label className='fw-bold'>Nội dung phản hồi:</Form.Label>
                <Form.Control as='textarea' rows={12} value={content} 
                    onChange={(e) => setContent(e.target.value)}/>
            </Form.Group>

            <div className='d-flex justify-content-between'>
                <Form.Text className="text-muted">
                    Mọi thắc mắc cần được giải đáp, xin hãy liên hệ với chúng tôi.
                </Form.Text>
                <ReactStars count={5} size={40} activeColor="#ffd700" />
            </div>
            <div className='d-flex justify-content-end'>
                <Button onClick={sendFeedback}>Gửi</Button>
            </div>
        </Form>
    </div>
}
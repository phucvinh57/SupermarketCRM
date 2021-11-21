import React, { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactStars from "react-rating-stars-component"

export default function Feedback() {
    const [content, setContent] = useState("")
    return <div className='container mt-3' style={{ width: '70%' }}>
        <Form>
            <Form.Group className="mb-1" controlId="title">
                <Form.Label className='fw-bold'>Tiêu đề:</Form.Label>
                <Form.Control type="text" placeholder="Tiêu đề" />
            </Form.Group>

            <Form.Group className='mb-1' controlId="favourite">
                <Form.Label className='fw-bold'>Nội dung phản hồi:</Form.Label>
                <div style={editorStyle}>
                    <Editor
                        editorState={content}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={setContent}
                    />
                </div>

            </Form.Group>

            <div className='d-flex justify-content-between'>
                <Form.Text className="text-muted">
                    Mọi thắc mắc cần được giải đáp, xin hãy liên hệ với chúng tôi.
                </Form.Text>
                <ReactStars count={5} size={40} activeColor="#ffd700" />
            </div>
            <div className='d-flex justify-content-end'>
                <Button>Gửi</Button>
            </div>
        </Form>
    </div>
}

const editorStyle = {
    border: '1px solid #ced4da',
    borderRadius: '0.25rem',
    padding: '0.375rem 0.75rem',
    height: '325px',
    'overflow-y': 'scroll'
}
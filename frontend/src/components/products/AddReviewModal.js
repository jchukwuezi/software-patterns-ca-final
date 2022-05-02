import {React, useState} from "react";
import {Button, Modal, Form, Row, Col} from "react-bootstrap";

const AddReviewModal = (props) =>{
    const [body, setBody] = useState("")
    const [rating, setRating] = useState("")
    const {show, onClose, productId, productName} = props;

    //call to api to add product to cart
    const handleSubmit = async (e) =>{
        e.preventDefault();
        fetch(`http://localhost:4000/api/reviews/add/${productId}`, {
            credentials: 'include',
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                body: body,
                rating: rating
            })
        })
        .catch((err) => {
            console.error(err)
        })
        .then(async res => {
            if(!res.ok){
                alert(await res.text())
            }
            else{
                alert(await res.text())
            }
        })
    }
    
    
    return(
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Enter Review on Product {productName}</Modal.Title>
            </Modal.Header>
            <Row>
            <Col className="p-5 m-auto shadow-sm rounded-lg">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-2">
                    <Form.Label>Enter Rating</Form.Label>
                    <Form.Control type="number" placeholder="Rate the product from 1 to 5" name="rating" onChange= {e => setRating(e.target.value)}/>  
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Enter Review</Form.Label>
                    <Form.Control type="text" placeholder="Review the product" name="review" onChange= {e => setBody(e.target.value)}/>  
                </Form.Group>

                <div className="d-grid">
                    <Button className="mb-3 mt-5" type="submit">
                    Add Review
                    </Button>
                </div>
            </Form>
            </Col>
        </Row>
        </Modal>
    )
}


export default AddReviewModal;
import {React, useState} from "react";
import {Button, Modal, Form, Row, Col} from "react-bootstrap";

const QuantityModal = (props) =>{
    const [quantity, setQuantity] = useState("")
    const {show, onClose, productId, name} = props;

    //call to api to add product to cart
    const handleSubmit = async (e) =>{
        e.preventDefault();
        fetch(`http://localhost:4000/api/carts/add/${productId}`, {
            credentials: 'include',
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                quantity: quantity
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
                <Modal.Title>How Many {name} would you like to buy</Modal.Title>
            </Modal.Header>
            <Row>
            <Col className="p-5 m-auto shadow-sm rounded-lg">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-2">
                    <Form.Label>Enter Quantity</Form.Label>
                    <Form.Control type="number" placeholder="How many do you want" name="quantity" onChange= {e => setQuantity(e.target.value)}/>  
                </Form.Group>

                <div className="d-grid">
                    <Button className="mb-3 mt-5" type="submit">
                    Add To Cart
                    </Button>
                </div>
            </Form>
            </Col>
        </Row>
        </Modal>
    )
}


export default QuantityModal;
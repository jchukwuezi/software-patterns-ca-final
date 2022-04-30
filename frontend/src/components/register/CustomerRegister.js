import React, { useState } from "react";
import {Col, Container, Row, Button, Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const CustomerRegister = () =>{
    const navigate = useNavigate()
    const [customerName, setCustomerName] = useState("")
    const [customerUserName, setCustomerUserName] = useState("")
    const [customerAddress, setCustomerAddress] = useState("")
    const [customerPassword, setCustomerPassword] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault();
        fetch("http://localhost:4000/api/customers/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: customerName,
                username: customerUserName,
                address: customerAddress,
                password: customerPassword,
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
                alert('Registration successful')
                console.log(`New user ${customerUserName} added`)
                navigate("/customer/login")
            }
        })
    }

    return(
        <Container>
        <h1 className="text-primary mt-5 p-3 text-center rounded">Customer Register</h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mt-2">
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" placeholder="Enter customer name" name="name" onChange={e => setCustomerName(e.target.value)}/>   
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Username </Form.Label>
                            <Form.Control type="text" placeholder="Enter customer username" name="username" onChange= {e => setCustomerUserName(e.target.value)}/>   
                        </Form.Group>

                        
                        <Form.Group className="mt-2">
                            <Form.Label>Address </Form.Label>
                            <Form.Control type="text" placeholder="Enter customer address" name="address" onChange= {e => setCustomerAddress(e.target.value)}/>   
                        </Form.Group>
                        
                        <Form.Group className="mt-2">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange = {e => setCustomerPassword(e.target.value)}/>   
                        </Form.Group>
                        
                        <Button className="mt-5" variant="primary btn-block" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}


export default CustomerRegister;
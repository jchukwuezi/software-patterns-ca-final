import React, { useState } from "react";
import {Col, Container, Row, Button, Card, Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const CustomerLogin = () =>{
    const navigate = useNavigate()
    const [customerUserName, setCustomerUserName] = useState("")
    const [customerPassword, setCustomerPassword] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault();
        fetch("http://localhost:4000/api/customers/login", {
            credentials: 'include',
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: customerUserName,
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
                alert('Login successful')
                console.log(`New user ${customerUserName} added`)
                navigate("/customer/homepage")
            }
        })
    }

    return(
        <Container>
        <h1 className="text-primary mt-5 p-3 text-center rounded">Customer Login</h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-2">
                            <Form.Label>Username </Form.Label>
                            <Form.Control type="text" placeholder="Enter customer username" name="username" onChange= {e => setCustomerUserName(e.target.value)}/>   
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

export default CustomerLogin
import React from "react";
import {Col, Container, Row, Button, Card} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const LandingPage = () =>{
    const navigate = useNavigate()

    return(
        <Container>
        <h1 className="mt-5 p-3 text-center rounded">Welcome to Online Clothes Shop</h1>
        <p> </p>
            <Row>
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Card style={{border : 'none'}}>
                    <Card.Body className="text-center">
                        <Card.Title> I am an admin </Card.Title>
                        <Card.Text>Can add products and view purchase history of products</Card.Text>
                    </Card.Body>
                    <Button variant="success btn-block" onClick={()=>{
                        navigate("/admin/register")
                    }}> Register</Button>
                    <Button className="mt-3" variant="outline-success" onClick={()=>{
                        navigate("/admin/login")
                    }}> Login</Button>
                    </Card>
                </Col>

                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Card style={{border : 'none'}}>
                    <Card.Body className="text-center">
                        <Card.Title> I am an customer </Card.Title>
                        <Card.Text>Can make products </Card.Text>
                    </Card.Body>
                    <Button variant="primary btn-block" onClick={()=>{
                        navigate("/customer/register")
                    }}> Register</Button>
                    <Button className="mt-3" variant="outline-primary" onClick={()=>{
                        navigate("/customer/login")
                    }}> Login</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default LandingPage;
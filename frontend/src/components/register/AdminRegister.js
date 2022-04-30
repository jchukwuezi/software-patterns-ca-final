import React, { useState } from "react";
import {Col, Container, Row, Button, Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const AdminRegister = () =>{
    const navigate = useNavigate()

    //storing inputs in state
    const [adminName, setAdminName] = useState("")
    const [adminUserName, setAdminUserName] = useState("")
    const [adminPassword, setAdminPassword] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault();
        fetch("", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: adminName,
                username: adminUserName,
                password: adminPassword,
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
                console.log(`New user ${adminName} added`)
                navigate("/admin/login")
            }
        })
    }

    return(
        <Container>
        <h1 className="text-success mt-5 p-3 text-center rounded">Admin Register</h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mt-2">
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" placeholder="Enter admin name" name="name" onChange={e => setAdminName(e.target.value)}/>   
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Username </Form.Label>
                            <Form.Control type="text" placeholder="Enter admin username" name="username" onChange= {e => setAdminUserName(e.target.value)}/>   
                        </Form.Group>
                        
                        <Form.Group className="mt-2">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange = {e => setAdminPassword(e.target.value)}/>   
                        </Form.Group>
                        
                        <Button className="mt-5" variant="success btn-block" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );

 

}

export default AdminRegister;
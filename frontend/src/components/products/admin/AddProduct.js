import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, InputGroup, FormControl, Row, Button, Col} from "react-bootstrap";
import AdminNav from "../../AdminNav";


const AddProduct = () => {
    
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch("http://localhost:4000/api/products/add", {
            credentials: 'include',
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                price: price,
                name: name,
                category: category,
                manufacturer: manufacturer
            })
        })
        .then(async (res) => {
            if(!res.ok){
                alert(await res.text())
            }

            else if(res.status===409){
                alert(await res.text())
            }

            else{
                alert(`New Product ${name} successfully created`)
                navigate("/admin/homepage")
            }
        })
    }


    return (
        <div>
            <AdminNav />
            <h3 className="text-success mt-5 p-3 text-center rounded">Add Product</h3>
            <Container>
                <Row className="mt-5">
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-2">
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" placeholder="Name of the product" name="name" onChange={e => setName(e.target.value)}/>   
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Category of the product" onChange={e => setCategory(e.target.value)}/>
                        </Form.Group>
                    
                        <InputGroup className="mt-3">
                            <InputGroup.Text>€</InputGroup.Text>
                            <FormControl aria-label="Price of Product" onChange={e => setPrice(e.target.value)}/>
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>

                        <Form.Group className="mt-3">
                            <Form.Label>Manufacturer</Form.Label>
                            <Form.Control type="text" placeholder="Manufacturer of the product" onChange={e => setManufacturer(e.target.value)}/>
                        </Form.Group>
                
                        <div className="d-grid">
                            <Button className="mt-5" variant="success btn-block" type="submit">
                            Add Product
                            </Button>
                        </div>
                    </Form>
                </Col>
                </Row>
            </Container>
        </div>
    )
}



export default AddProduct;
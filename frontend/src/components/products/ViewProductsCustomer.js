import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import QuantityModal from "./QuantityModal";

const ViewProductsCustomer = () => {
    const [productData, setProductData] = useState([])
    const [state, setState] = useState({})
    const navigate = useNavigate()

    const [productId, setProductId] = useState("")
    const [productName, setProductName] = useState("")

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    useEffect(()=>{
        APICallForProducts()
        return () => {
            setState({})
        }
    }, [])

    const APICallForProducts = () => {
        fetch("http://localhost:4000/api/products/all", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("")
            }

            else{
                console.log(res)
                const getData = async() =>{
                    const data = await res.json()
                    setProductData(data)
                }
                getData()
            }
        })
    }

    if(productData.length === 0){
        return(
        <Container>
            <Row className="mt-2">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <h1 className="mt-5 p-3 text-center">No Products exist</h1>
                    <p className="mt-2 p-3 text-center rounded">Please wait for admin to add products</p> 
                </Col>
            </Row>
        </Container>
        )
    }

    return(
        //example of observer pattern with the cards showing products created
        <Container>
        <h2 className="mt-3 p-3 text-center"> Products</h2>
        <Row className="justify-content-center">
            {productData.map((productData, k) => (
            <Col key={k} xs={12} md={4} lg={3}>
                <Card>
                    <Card.Body>
                        <Card.Title>{productData.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{productData.category}</Card.Subtitle>
                        {productData.stockLevel < 3 ? 
                            <Badge bg="danger" className="mb-3">Low Stock</Badge>
                        :null}
                         <Card.Text className="mb-2">€{productData.price} </Card.Text>
                         <Card.Text className="mb-2">In Stock: {productData.stockLevel} </Card.Text>
                        <div className="d-grid">                        
                            <Button variant="primary" onClick={()=>{
                                setProductId(productData._id)
                                setProductName(productData.name)
                                handleShow()
                            }}>Add to Cart</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ))}
       </Row>
       <QuantityModal show={show} onClose={handleClose} productId={productId} productName={productName}/>
    </Container>
    )

}

export default ViewProductsCustomer;
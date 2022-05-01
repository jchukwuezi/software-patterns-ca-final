import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const ViewProductsAdmin = () => {
    const [productData, setProductData] = useState([])
    const [state, setState] = useState({})
    const navigate = useNavigate()

    const formatDate = (date) =>{
        const dt = new Date(date)
        return dt.toLocaleDateString(
            'en-gb',
            {
                year: 'numeric',
                month: 'long',
                day:'numeric'
            }
        )
    }

    useEffect(()=>{
        APICallForProducts()
        return () => {
            setState({})
        }
    }, [])

    const APICallForProducts = () => {
        fetch("http://localhost:4000/api/products/admin", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/org/login")
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
                    <h1 className="mt-5 p-3 text-center">No Products found</h1>
                    <p className="mt-2 p-3 text-center rounded">Please add some products</p> 
                    <div className="d-grid">
                        <Button variant="success btn-block" onClick={()=> navigate("/admin/add-product")}> Add Products</Button>
                    </div>
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
                        <Link to={`/admin/products/${productData._id}`}>
                            <Button variant="success">View Product</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        ))}
       </Row>
    </Container>
    )

}

export default ViewProductsAdmin;
import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar, Stack} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import CustomerNav from "../CustomerNav";

const CustomerCart = () =>{
    const [cartData, setCartData] = useState([])
    const [state, setState] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        cartAPI()
        return () => {
            setState({})
        }
    }, [])

    const cartAPI = () =>{
        fetch("http://localhost:4000/api/carts/all", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res)=> {
            if(!res.ok){
                alert("Error with viewing products")
            }

            else{
                console.log(res)
                const getData = async() =>{
                    const data = await res.json()
                    setCartData(data.cartItems)
                }
                getData()
            }
        })
    }

    const buyProducts = async () =>{
        fetch(`http://localhost:4000/api/carts/checkout`, {
            credentials: 'include',
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                
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

    const removeFromCart = (id) =>{
        fetch(`http://localhost:4000/api/products/remove-from-cart/${id}`, {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then(async (res)=> {
            if(!res.ok){
                alert(await res.text())
            }
            else{
                alert("Ended subscription")
            }
        })
    }

    if(cartData.length === 0){
        return(
            <div>
            <CustomerNav/>
                <Container>
                    <Row className="mt-2">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <h1 className="mt-5 p-3 text-center">No Products found</h1>
                            <p className="mt-2 p-3 text-center rounded">Add some to your cart</p> 
                            <div className="d-grid">
                                <Button variant="primary btn-block" onClick={()=> navigate("/customer/homepage")}> Go To Homepage</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }  

    return(
        <div>
        <CustomerNav />
        <Container>
            <Col md="auto">
            <h1 className="mt-5 p-3 text-center">Customer</h1>
                {cartData.map((cartData, k) => (
                <Row className="p-2 border rounded mt-2" key={k}>
                    <Col> 
                        <h1>{cartData.name}</h1>
                        <h4>Amount: ???{cartData.price}</h4>
                        <h4>Quantity: {cartData.quantity}</h4>
                    </Col>
                    <Col> 
                        <Button onClick={()=>{
                        }}> Remove from Cart</Button>
                    </Col>
                </Row>
                ))}
            </Col>

            <Row className="justify-content-center mt-3">
                <Col sm={6}>
                    <div className="d-grid mt-2">
                        <Button variant="primary btn-block" onClick={()=>{
                            buyProducts()
                        }}> Buy Products</Button>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    )

}


export default CustomerCart;
import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar, Stack} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import CustomerNav from "../CustomerNav";
import AddReviewModal from "./AddReviewModal";

const ViewMyHistory = () =>{
    const [historyData, setHistoryData] = useState([])
    const [productName, setProductName] = useState("")
    const [productId, setProductId] = useState("")

    const [state, setState] = useState({})
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    useEffect(()=>{
        historyAPI()
        return () => {
            setState({})
        }
    }, [])

    const historyAPI = () =>{
        fetch("http://localhost:4000/api/purchasehistories/all", {
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
                    setHistoryData(data.history)
                }
                getData()
            }
        })
    }

    const removeFromHistory = (id) =>{
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

    if(historyData.length === 0){
        return(
            <div>
            <CustomerNav/>
                <Container>
                    <Row className="mt-2">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <h1 className="mt-5 p-3 text-center">No History found</h1>
                            <p className="mt-2 p-3 text-center rounded">Make some purchases</p> 
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
            <h1 className="mt-5 p-3 text-center">Your Purchases</h1>
                {historyData.map((historyData, k) => (
                <Row className="p-2 border rounded mt-2" key={k}>
                    <Col> 
                        {historyData.items.map((item, k) => (
                            <Row className="p-2 border rounded mt-2" key={k}>
                                <Col>
                                    <h2 className="text-center">Name: {item.name}</h2>
                                    <h4 className="text-center">Amount: €{item.price}</h4>
                                    <h4 className="text-center">Quantity: {item.quantity}</h4>
                                    <Row className="justify-content-center mt-3">
                                        <Col sm={6}>
                                            <div className="d-grid mt-2">
                                                <Button onClick={()=>{
                                                    handleShow()
                                                    setProductName(item.name)
                                                    setProductId(item.productId)
                                                }} className="mt-2"> Add Review</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        ))}    
                        <h3 className="text-center">Total Amount: {historyData.bill}</h3>
                        <Row className="justify-content-center mt-3">
                        <Col sm={6}>
                            <div className="d-grid mt-2">
                                <Button onClick={()=>{
                                }} className="mt-2" variant="danger"> Delete from history</Button>
                            </div>
                        </Col>
                        </Row>
                    </Col>
                </Row>
                ))}
            </Col>
            <AddReviewModal show={show} onClose={handleClose} productId={productId} productName={productName} />                    
        </Container>
        </div>
    )

}


export default ViewMyHistory;
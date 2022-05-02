import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar, Stack} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import AdminNav from '../../AdminNav'

const ViewHistory = () =>{
    const [historyData, setHistoryData] = useState([])
    const [state, setState] = useState({})
    const navigate = useNavigate()



    useEffect(()=>{
        historyAPI()
        return () => {
            setState({})
        }
    }, [])

    const historyAPI = () =>{
        fetch("http://localhost:4000/api/purchasehistories/all/admin", {
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
            <AdminNav/>
                <Container>
                    <Row className="mt-2">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <h1 className="mt-5 p-3 text-center">No History found</h1>
                            <p className="mt-2 p-3 text-center rounded">Customers need to make purchases</p> 
                            <div className="d-grid">
                                <Button variant="success btn-block" onClick={()=> navigate("/admin/homepage")}> Go To Homepage</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }  

    return(
        <div>
        <AdminNav />
        <Container>
            <Col md="auto">
                {historyData.map((historyData, k) => (
                <Row className="p-2 border rounded mt-2" key={k}>
                <h2 className="mt-5 p-3 text-center">Purchases from customer {historyData.customer.name}</h2>
                    <Col> 
                        {historyData.items.map((item, k) => (
                            <Row className="p-2 border rounded mt-2" key={k}>
                                <Col>
                                    <h2 className="text-center">Name: {item.name}</h2>
                                    <h4 className="text-center">Amount: €{item.price}</h4>
                                    <h4 className="text-center">Quantity: {item.quantity}</h4>
                                </Col>
                            </Row>
                        ))}    
                        <h3 className="text-center">Total Amount: {historyData.bill}</h3>
                    </Col>
                </Row>
                ))}

            </Col>

        </Container>
        </div>
    )

}


export default ViewHistory;
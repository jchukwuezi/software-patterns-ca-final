import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar, Stack} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import CustomerNav from "../CustomerNav";
import AddReviewModal from "./AddReviewModal";

const ViewMyReviews = () =>{
    const [reviewData, setReviewData] = useState([])
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
        fetch("http://localhost:4000/api/reviews/get", {
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
                    setReviewData(data.reviews)
                }
                getData()
            }
        })
    }

    const deleteReview = (id) =>{
        fetch(`http://localhost:4000/api/reviews/delete/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then(async (res)=> {
            if(!res.ok){
                alert(await res.text())
            }
            else{
                alert(await res.text())
            }
        })
    }

    if(reviewData.length === 0){
        return(
            <div>
            <CustomerNav/>
                <Container>
                    <Row className="mt-2">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <h1 className="mt-5 p-3 text-center">No Reviews found</h1>
                            <p className="mt-2 p-3 text-center rounded">Make some reviews on your purchase history</p> 
                            <div className="d-grid">
                                <Button variant="primary btn-block" onClick={()=> navigate("/customer/history")}> Go To Homepage</Button>
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
                {reviewData.map((reviewData, k) => (
                <Row className="p-2 border rounded mt-2" key={k}>
                    <h2 className="text-center">Name: {reviewData.product.name}</h2>
                    <h4 className="text-center">Rating {reviewData.rating}</h4>
                    <p className="text-center">{reviewData.body}</p>
                    <Row className="justify-content-center mt-3">
                        <Col sm={6}>
                            <div className="d-grid mt-2">
                                <Button onClick={()=>{
                                    deleteReview(reviewData._id)
                                }} className="mt-2"> Delete Review</Button>
                            </div>
                        </Col>
                    </Row>
                </Row>
                ))}
            </Col>               
        </Container>
        </div>
    )

}


export default ViewMyReviews;
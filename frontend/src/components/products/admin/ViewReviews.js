import React, {useState, useEffect} from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar, Stack} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import AdminNav from '../../AdminNav'

const ViewReviews = () =>{
    const [reviewData, setReviewData] = useState([])
    const [state, setState] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        reviewAPI()
        return () => {
            setState({})
        }
    }, [])

    const reviewAPI = () =>{
        fetch("http://localhost:4000/api/reviews/get/admin", {
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

    if(reviewData.length === 0){
        return(
            <div>
            <AdminNav/>
                <Container>
                    <Row className="mt-2">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <h1 className="mt-5 p-3 text-center">No Reviews found</h1>
                            <p className="mt-2 p-3 text-center rounded">Customers need to make reviews</p> 
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
                {reviewData.map((reviewData, k) => (
                <Row className="p-2 border rounded mt-2" key={k}>
                <h2 className="mt-5 p-3 text-center">Reviews from Customer {reviewData.customer.name}</h2>
                    <Row className="p-2 border rounded mt-2" key={k}>
                        <h2 className="text-center">Product: {reviewData.product.name}</h2>
                        <h4 className="text-center">Rating: {reviewData.rating}</h4>
                        <p className="text-center">{reviewData.body}</p>
                    </Row>
                </Row>
                ))}
            </Col>
        </Container>
        </div>
    )

}


export default ViewReviews;
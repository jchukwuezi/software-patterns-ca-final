import React, {useEffect, useState}from "react";
import { Nav, Navbar, Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    useEffect(() => {
        fetch("http://localhost:4000/api/admins/auth/admin", {
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                alert('Unauthorized, please log in to view this page')
                navigate("/admin/login")
            }
            else{
                console.log(res)
                const getName = async() => {
                    const data = await res.json()
                    setUsername(data.name)
                }
                getName()
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const logout = () => {
        fetch("http://localhost:4000/api/admins/logout", {
            credentials: 'include',
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            mode: 'cors'
        })
        .then((res) => {
            if(!res.ok){
                console.log("Error with logging out")
            }
            else{
                navigate("/")
            }
        })
    }

    return (
        <Navbar variant="dark" bg="success">
            <Container>
                <Navbar.Brand> Clothes Shop for Admins </Navbar.Brand>
                <Navbar.Toggle />
                <Nav>
                    <Nav.Link onClick={()=> navigate("/admin/homepage")}>Home</Nav.Link>
                    {/*}
                    <Nav.Link>Groups</Nav.Link>
                    <Nav.Link>Account</Nav.Link>
                    */}
                    <Nav.Link onClick={()=>navigate("/admin/history")}>View History</Nav.Link>
                    <Nav.Link onClick={()=>navigate("/admin/add-product")}>Add Product</Nav.Link>
                    <Nav.Link onClick={()=>navigate("/admin/reviews")}>View Reviews</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as <a href="#login"> {username} </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}



export default AdminNav;
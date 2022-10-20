import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'D:/Axis/Internal Project/PAYWIZ/paywiz/src/security.css';
function Home() {
    return (
        <div className="Home">
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand id="brand" href="/home">PayWiz</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link id="navbut" href="/Employee">Employee</Nav.Link>
                    <Nav.Link id="navbut"  href="/bank">Bank</Nav.Link>
                    <Nav.Link id="navbut"  href="/salary">Salary</Nav.Link>
                    <Nav.Link id="navbut" className='logout'  href="/login">Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>                         
        <div className='Auth-form-container'>
            <form className='Auth-form'>
                <div className='Auth-form-content' style={{textAlign:'center'}}>
                    <h3 className='Auth-form-title' style={{color:'red'}}>Welcome To PayWiz App</h3>
                    <h4 style={{color:'blue'}}>The solution for paying salary to Bank Employee</h4>
                    <h5 style={{color:'gray'}}>Browse to Employee /  Bank / Salary tabs <br/> to add details and functions </h5>
                    <p style={{color:'red'}}>Under Development</p>

                    <h6> To Access Eureka server <a href="http://localhost:8761/" rel="noreferrer" target="_blank">click here</a></h6>

                </div>
            </form>
        </div>
        </div>
    );
}
export default Home;
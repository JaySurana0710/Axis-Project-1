import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'D:/Axis/Internal Project/PAYWIZ/paywiz/src/security.css';
function encode(Password){
    const md5 = require('md5')
    let password = md5(Password);
    return password;
}


function Login(){
    const [accountNumber,setAccountNumber] = useState('');
    const [password,setPassword] = useState('');
    const navigate =useNavigate();

    const setAccNumber = (e) => {
        setAccountNumber(e.target.value);
    };
    const setPass = (e) => {
        setPassword(e.target.value);
    };

    async function validate(e) {
        e.preventDefault();
        const navigateHome = (e) => {
            // 👇️ navigate to /
            navigate("/home");
        };
        
        let data = {
        accountNumber: accountNumber,
        password: encode(password)
        }
        console.log(data.accountNumber,data.password);
        

        await axios.post('http://localhost:3004/user/signin',data)
        .then( response => {console.log(response.data);
        if (response.data==="valid"){
            console.log("Welcome !")
            navigateHome(e);
        }
        else if(response.data==="incorrect password"){
            alert("Incorrect Password");
        }
        else if(response.data==="no account found"){
            alert("No Account Found");
        }
        else{
            alert("Please Vertify Credentials !")
        }
        })
        
        
    };

    return(
        
        <div className='Login'>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand id="brand">PayWiz</Navbar.Brand>
                    
                </Container>                                                   
            </Navbar>
        
        <div className='Auth-form-container'>
            <form className='Auth-form' onSubmit={e => validate(e)}>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Login</h3>
                    <div className='text-center'>
                        Not Registered?{" "}
                        <span className='link-primary'><Link id="link" to='/signup'>Sign up</Link></span>
                    </div>
                    <div className='form-group mt-3'>
                        <label>AccountNumber : </label>
                        <input className='form-control mt-1' type="text" id="accountNumber" placeholder='AccountNumber' onChange={(e) => setAccNumber(e) }/>
                    </div>
                    <div className='form-group mt-3'>
                        <label>Password : </label>
                        <input className='form-control mt-1' type="password" id="password" placeholder='Password' onChange={(e) => setPass(e) }/>
                    </div>
                    <div className='d-grid gap-2 mt-3 justify-content-center align-content-center'>
                    <button  className='btn btn-primary ' id='btn' type="submit" >Login</button>
                    </div>
                    
                    <p className="text-center mt-2"><Link id="link" to="/ForgotPassword">Forgot Password</Link></p>
                </div>
            </form>
        </div>
        </div>
        
    );
}
export default Login;
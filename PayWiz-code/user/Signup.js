import {useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'D:/Axis/Internal Project/PAYWIZ/paywiz/src/security.css';

function encode(Password){
    const md5 = require('md5')
    let password = md5(Password);
    return password;
}

function Signup(){
    const [accountNumber,setAccountNumber] = useState('');
    const [password,setPassword] = useState('');
    const navigate =useNavigate();
    
    

    const setAccountNumberId = (e) => {
        setAccountNumber(e.target.value);
    };
    const setPass = (e) => {
        setPassword(e.target.value);
    };

    async function register(e) {
        e.preventDefault();
        const navigateLogin = (e) => {
            // 👇️ navigate to /
            navigate("/login");
        };
        let data = {
        accountNumber: accountNumber,
        password: encode(password)
        }
       //console.log(JSON.stringify(data));
        // fetch('http://localhost:8080/user/create',{
        // method:"POST",
        // body: JSON.stringify(data),
        // headers : {
        //     "Content-Type":"application/json",
        //     "Access-Control-Allow-Origin":"*"
        // }
        // }).then(response => response.json())
        // .then(json => console.log(json));
        const resp = await fetch('http://localhost:3002/employee/findEmployees',{method:"GET"});
        var dat = await resp.json();
        console.log(dat)
        for( let p of dat){
            if(p.accountNumber===accountNumber){
                break;
            }
            else{
                alert('Account Number Not Found !');
                return null;
            }
            
        }

        await axios.post('http://localhost:3004/user/create',data)
        .then( response => {console.log(response.data);
            if (response.data==="created"){
                alert("Account Created")
                navigateLogin(e);
            }
            else{
                alert("Account already exists!")
            }
            })
        // .then(response => response.json())
        // .then(json => {
        //     console.log(json.stringify());
        //     navigateLogin(e)
        // })

        
    };
    return(
        <div className="Employee">
        <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand id="brand">PayWiz</Navbar.Brand>
                    
                </Container>                                                   
        </Navbar>
        <div className='Auth-form-container'>
            <form className='Auth-form' onSubmit={e => register(e)}>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Sign Up</h3>
                    <div className='text-center'>
                        Already Registered?{" "}
                        <span className='link-primary'><Link id='link' to="/Login">Login</Link></span>
                    </div>
                    <div className='form-group mt-3'>
                        <label>AccountNumber : </label>
                        <input className='form-control mt-1' type="accountNumber" id="accountNumber" placeholder='AccountNumber' onChange={(e) => setAccountNumberId(e) }/>
                    </div>
                    <div className='form-group mt-3'>
                        <label>Password : </label>
                        <input className='form-control mt-1' type="password" id="password" placeholder='Password' onChange={(e) => setPass(e) }/>
                    </div>
                    <div className='d-grid gap-2 mt-3 justify-content-center align-content-center'>
                    <button className='btn btn-primary' id='btn' type="submit">Signup</button>
                    </div>
                    <p className="text-center mt-2"></p>
                </div>
            </form>
        </div>
        </div>
        
    );
}
export default Signup;
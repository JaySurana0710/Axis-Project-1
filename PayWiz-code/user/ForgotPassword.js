import {Link} from 'react-router-dom';


function ForgotPassword(){
    const email="'palceholder'";
    return(
        <div className="Auth-form mt-4 ms-4">
            <h1>Forgot Password</h1>
            
            <p>Hello {email} did you forget your password</p>
            <div className='text-center'>
                Remembered your password ? {" "}<br/>
                Go back to login page<br/>
                <span className='link-primary'><Link id='link' to="/Login">Login</Link></span>
            </div>
            
            
        </div>
    );
}
export default ForgotPassword;
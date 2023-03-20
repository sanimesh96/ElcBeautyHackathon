import React  , {useState}from 'react';
import Navbar from '../LandingPage/TopSection/Navbar/Navbar';
import { Link  , Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import {faGoogle , faFacebook} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import {SetLogin} from '../../ReduxStore/Actions/mainAction';
 
import { ToastContainer, toast } from 'react-toastify';
import {toast as tt} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

    let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("email", json.user.email);
      navigate("/");
    }
  };

    return (
        <>
            <Navbar />

            <div className="login_div">
                <div className="inner_login_div">
                    <div>
                        <img src="https://colorlib.com/etc/regform/colorlib-regform-20/images/registration-form-4.jpg" alt="Not Found" />
                    </div>


                    <div className='formSide'>

                    {/* here */}

                    <div className='loginconatiner'>
        <div className='login_img'>
            <img src="https://www.frankbody.com/wp-content/themes/frank/resources/images/hotel-pink-logo.png" alt="This" />
        </div>
        <div >
            <h2 className='login_h2'>Sign in to your account</h2>
        </div>
        <form  onSubmit={handleSubmit} className='loginform'>
        <input type="email" name="email" value={credentials.email} placeholder="Email"  onChange={onChange} required/>
            <input type="password" name="password" value={credentials.password} placeholder="Password" onChange={onChange} required/>
            <input type="submit" value="SIGN IN" />
        </form>
        <div className='loginlinks'>
            <Link  className='loginlinksdata firstlink'>Forgot your password? </Link>
            <Link className='loginlinksdata firstlink' to="/register">Register an account</Link>
        </div>

    </div>

    <div className="login_with_container">

        <div className="login_btns">
            <button><FontAwesomeIcon className='google' icon={faGoogle}/> &nbsp;&nbsp;&nbsp;&nbsp;Google</button>
            <button><FontAwesomeIcon className='facebook' icon={faFacebook} />&nbsp;&nbsp;&nbsp;&nbsp;Facebook</button>
        </div>
    </div>

    <ToastContainer  style={{zIndex:100000000}}/>

    {/* here.. */}


    
                    </div>


                </div>
            </div>
        </>
    );
}

export default Login;
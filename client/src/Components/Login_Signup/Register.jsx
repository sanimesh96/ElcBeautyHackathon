import React, { useState } from "react";
import Navbar from "../LandingPage/TopSection/Navbar/Navbar";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { toast as tt } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  let navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, phoneNumber } = credentials;

    const response = await fetch(`http://localhost:5001/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phoneNumber,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // save tha uth and redirect
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("email", json.user.email);
      navigate("/about");
    } else {
    }
  };

  return (
    <>
      <Navbar />

      <div className="login_div">
        <div className="inner_login_div">
          <div>
            <img
              src="https://colorlib.com/etc/regform/colorlib-regform-20/images/registration-form-4.jpg"
              alt="Not Found"
            />
          </div>

          <div className="formSide">
            <div className="registerconatiner">
              <form onSubmit={handleSubmit} className="registerform">
                <h2 className="cana">Create an account</h2>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={credentials.name}
                  onChange={onChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={onChange}
                  required
                />
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  value={credentials.phoneNumber}
                  onChange={onChange}
                  required
                />

                <ToastContainer style={{ zIndex: 100000 }} />
                <span className="maysend">
                  You'll be sent an email with instructions to activate your
                  account
                </span>
                {/* <input type="submit" value="REGISTER" /> */}
                <div className="text-center mt-4 mb-3 pb-1">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
              <div className="registerlinks">
                {/* <Link  className='registerlinksdata firstlink'>Forgot your password? </Link> */}
                <Link className="registerlinksdata firstlink" to="/login">
                  Have an account? Login
                </Link>
              </div>
            </div>

            <ToastContainer style={{ zIndex: 100000000 }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

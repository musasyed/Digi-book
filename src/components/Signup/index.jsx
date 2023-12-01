import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const submitButton = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/login");
    } else {
      alert("Please Enter Correct Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // setCredentials(e.target.value)
    // console.log(credentials)
  };

  return (
    <form className="container form-control mt-5" onSubmit={submitButton}>
      <div className="mb-3">
      <h1 className='mb-5'>Signup to use your DigiBook</h1>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={credentials.name}
          id="name"
          onChange={onChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={credentials.email}
          className="form-control"
          aria-describedby="emailHelp"
          onChange={onChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={credentials.password}
          id="password"
          onChange={onChange}
          required
          minLength={5}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          name="cpassword"
          value={credentials.cpassword}
          id="cpassword"
          onChange={onChange}
          required
          minLength={5}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Signup;

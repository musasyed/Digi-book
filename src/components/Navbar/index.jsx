import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../Alert';

const Navbar = () => {
  const navigate=useNavigate();
  let location=useLocation();
useEffect(() => {
  // console.log(location.pathname)
}, [location])

const handleLogout=()=>{
  localStorage.removeItem('token')
  navigate("/login")

}


  return (
    <>
    <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">Digibook</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link ${location.pathname==="/about-us"?"active":""}`} aria-current="page" to="/about-us">About Us</NavLink>
          </li>
        </ul>
       {!localStorage.getItem('token')?<form className='d-flex'>
    <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
    <Link className="btn btn-primary "  to="/signup" role="button">Sign Up</Link>
    </form>:<button onClick={handleLogout} className='btn btn-primary'>Logout</button>} 

    </div>

      </div>
  </nav>
  <Alert  message={"Make Your Notes Here"}/>
<Outlet />
</>
  )
}

export default Navbar
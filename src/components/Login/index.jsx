import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate=useNavigate();
    const submitButton=async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:3000/api/auth/loginuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})

          });
          const json=await response.json()
          console.log(json);
          if(json.success){
                // Redirect
                localStorage.setItem('token',json.JSOTOKEN)
                navigate("/")
          }
          else{
            alert("Please Enter Correct Credentials")
          }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
        // setCredentials(e.target.value)
        // console.log(credentials)
    }


  return (
    <form className='container mt-5 form-control' onSubmit={submitButton}>
  <div className="mb-5 mt-2">
    <h1 className='mb-5'>Login to continue your DigiBook</h1>
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" name="email" id="email" value={credentials.email} className="form-control"  aria-describedby="emailHelp"  onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password"  id='password' className="form-label">Password</label>
    <input type="password" className="form-control" name="password"  value={credentials.password} id="password" onChange={onChange} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  )
}

export default Login
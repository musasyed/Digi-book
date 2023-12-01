import React,{useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './Pages/About'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState'
import Login from './components/Login'
import Signup from './components/Signup'




const App = () => {


  return (
  
    <NoteState>   
    <Routes>
    <Route path="/" element={<Navbar />}>
    <Route index element={<Home />}></Route>
     <Route  path='about-us' element={<About />}/>
     <Route  path='/login' element={<Login />}  />
     <Route  path='/signup' element={<Signup/>} />
    </Route>
  </Routes>
  </NoteState>




  )
}

export default App
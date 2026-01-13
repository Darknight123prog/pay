import React from 'react'
import {  Routes, Route } from "react-router";
import Home from '../Pages/Home';
import FormPage from '../Pages/FormPage';
function App() {
  return (
    
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/payForm' element={<FormPage/>}/>

    </Routes>
      
      
    </>
  )
}

export default App

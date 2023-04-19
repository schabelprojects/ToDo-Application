import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage/LandingPage"
import HomePage from "./components/HomePage/HomePage"
import TodoApp from "./components/TodoApp/TodoApp"

function App() {
 
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path='home' element={<HomePage />}  />
      <Route path='todoapp' element={<TodoApp />} />
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App

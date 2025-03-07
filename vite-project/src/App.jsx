import React from "react"
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from './assets//Home'
import { Login } from "./assets/Login"
import { Cart } from "./assets/Cart"
import { EachRestaurant } from "./assets/EachRestaurant"
import { NotFound } from "./assets/NotFound"

function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path = '/login' element={<Login/>} />
        <Route exact path = '/' element={<Home/>} />
        <Route exact path = '/cart' element={<Cart/>} />
        <Route exact path = 'restaurant/:id' element={<EachRestaurant/>}/>
        <Route path ="/*" element={<NotFound/>}/>
      </Routes>
    </Router>

    </>
  )
}

export default App

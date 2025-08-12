import React from 'react'
import './App.css'
import ListStudents from './Pages/ListStudents'
import Home from './Pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListStudents />} />
        <Route path="/manage" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App

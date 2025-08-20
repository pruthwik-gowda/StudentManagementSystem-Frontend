import React from 'react'
import './App.css'
import ListStudents from './Pages/ListStudents'
import Home from './Pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ListTeachers from './Pages/ListTeachers';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListStudents />} />
        <Route path="/manage" element={<Home />} />
        <Route path="/teacher" element={<ListTeachers />} />
      </Routes>
    </Router>
  )
}

export default App

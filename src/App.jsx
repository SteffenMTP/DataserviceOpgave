import React from 'react';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from "react-router-dom";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './pages/Home';
import Facts from './pages/Facts';
import Users from './pages/jsonplaceholder/Users';
import Species from './pages/SWAPI/Species';
import Starships from './pages/SWAPI/Starships';
import Navbar from './Layout/Navbar';
import Header from './Layout/Header';

function App() {
  return (

    <Router>
      <Navbar/>
      <Header/>

      <section>

        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/Facts" element={<Facts/>} />
          <Route path="/Users" element={<Users/>}/>
          <Route path="/Species" element={<Species/>}/>
          <Route path="/Starships" element={<Starships/>}/>
        </Routes>

      </section>

    </Router>


  );
}

export default App;

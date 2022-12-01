import React from 'react';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from "react-router-dom";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './pages/Home';
import Users from './pages/jsonplaceholder/Users';
import Species from './pages/SWAPI/Species';
import Starships from './pages/SWAPI/Starships';
import News from './pages/NewsAPI/News';
import NoMatch from './pages/NoMatch';
import Facts from './pages/RapidAPI/Facts';
import Hobbies from './pages/RapidAPI/Hobbies';
import Weather1 from './pages/OpenWeather/Weather1';
import Weather2 from './pages/OpenWeather/Weather2';
import Weather3 from './pages/OpenWeather/Weather3';
import Rover from './pages/NASA/Rover';
import MarsWeather from './pages/NASA/MarsWeather';

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
          <Route path="/News" element={<News/>}/>
          <Route path="/Hobby" element={<Hobbies/>}/>
          <Route path="/Weather1" element={<Weather1/>}/>
          <Route path="/Weather2" element={<Weather2/>}/>
          <Route path="/Weather3" element={<Weather3/>}/>
          <Route path="/Rover" element={<Rover/>}/>
          <Route path="/MarsWeather" element={<MarsWeather/>}/>

          <Route path="*" element={<NoMatch/>}/> 

        </Routes>

      </section>

    </Router>


  );
}

export default App;

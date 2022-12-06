import React from 'react';
import { NavLink, Link } from "react-router-dom";
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import car from '../assets/Logo.png';

const Navbar = () => {
  return (

    //NAVBAR WORK IN PROGRESS

    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link className="navbar-brand" href="#" to="/">
          <img src={car} alt="logo" width="80" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <NavLink end className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li> */}
            
            {/* JSON PLACEHOLDER */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">JSONPlaceholder</span>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/Users">Find en user</NavLink></li>
              </ul>
            </li>

            {/* SWAPI */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">SWAPI</span>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/Species">Species</NavLink></li>
                <li><NavLink className="dropdown-item" to="/Starships">Starships</NavLink></li>
              </ul>
            </li>

            {/* NEWSAPI */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">NEWSAPI</span>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/News">News</NavLink></li>
              </ul>
            </li>

            {/* RAPIDAPI */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">RapidAPI</span>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/Facts">Søg en random fact</NavLink></li>
                <li><NavLink className="dropdown-item" to="/Hobby">Søg en random hobby</NavLink></li>
              </ul>
            </li>

            {/* WEATHERAPI */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Weather</span>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/Weather1">Søg efter Postnummer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/Weather2">Vejret - med adresseopslag hos DAWA</NavLink></li>
                <li><NavLink className="dropdown-item" to="/Weather3">Vejret - med adresseopslag hos DAWA m. kort</NavLink></li>
              </ul>
            </li>

            {/* NASAAPI */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">NASA</span>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/Rover">Mars Rover Data</NavLink></li>
                <li><NavLink className="dropdown-item" to="/MarsWeather">Mars Weather Data</NavLink></li>
              </ul>
            </li>

            {/* AIRTABLE TODOS */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">AirTable</span>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/ToDos">ToDos</NavLink></li>
                <li><NavLink className="dropdown-item" to="/ToDoCreate">Opret Todos</NavLink></li>
                <li><NavLink className="dropdown-item" to="/ToDosAdmin">Admin ToDos</NavLink></li>
              </ul>
            </li>

            {/* AIRTABLE BILER */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">AirTable - Biler</span>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/CarsList">Car List</NavLink></li>
                <li><NavLink className="dropdown-item" to="/CarsCreate">Create Car Item</NavLink></li>
                <li><NavLink className="dropdown-item" to="/ToDosAdmin">Admin ToDos</NavLink></li>
              </ul>
            </li>

            {/* ANDET */}
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/noget">Noget</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
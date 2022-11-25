import React from 'react';
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (

    //NAVBAR WORK IN PROGRESS

    // <nav className="navbar navbar-expand-lg bg-light">
    //         <div className="container">
    //             <Link className="navbar-brand" href="#">
    //                 <img src="#" alt="logo" width="80" />
    //             </Link>
    //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //                 <span className="navbar-toggler-icon"></span>
    //             </button>
    //             <div className="collapse navbar-collapse" id="navbarNav">
    //                 <ul className="navbar-nav">
    //                     <li className="nav-item">
    //                         <NavLink end className="nav-link" aria-current="page" to="/">Home</NavLink>
    //                     </li>
    //                     <li className="nav-item dropdown">
    //                         <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">JSONPlaceholder</span>
    //                         <ul className="dropdown-menu">
    //                             <li><NavLink className="dropdown-item" to="/Users">Find en user</NavLink></li>
    //                         </ul>
    //                     </li>
    //                     <li className="nav-item dropdown">
    //                         <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">SWAPI</span>
    //                         <ul className="dropdown-menu">
    //                             <li><NavLink className="dropdown-item" to="/Species">Species</NavLink></li>
    //                             <li><NavLink className="dropdown-item" to="/Starships">Starships</NavLink></li>
    //                         </ul>
    //                     </li>
    //                     <li className="nav-item">
    //                         <NavLink className="nav-link" aria-current="page" to="/noget">Noget</NavLink>
    //                     </li>
                       
    //                 </ul>
    //             </div>
    //         </div>
    //     </nav>

    <div id="navigation">
            <nav>
                <ul>
                    <li><Link to = "/">Home</Link></li>
                    <li><Link to = "/Facts">Facts</Link></li>
                    <li><Link to = "/Users">Users</Link></li>
                    <li><Link to = "/Species">Species</Link></li>
                    <li><Link to = "/Starships">Starships</Link></li>
                    <li><Link to = "/News">News</Link></li>
                    <li><Link to = "/Hobby">Hobbies</Link></li>
                </ul>
            </nav>

        </div>
  )
}

export default Navbar;
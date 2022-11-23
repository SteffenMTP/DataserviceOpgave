import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id="navigation">
            <nav>
                <ul>
                    <li><Link to = "/">Home</Link></li>
                    <li><Link to = "/Facts">Facts</Link></li>
                    <li><Link to = "/Users">Users</Link></li>
                    <li><Link to = "/Species">Species</Link></li>
                    <li><Link to = "/Starships">Starships</Link></li>
                </ul>
            </nav>

        </div>
  )
}

export default Navbar;
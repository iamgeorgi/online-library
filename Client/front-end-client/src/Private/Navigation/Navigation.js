import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {

    return(
        <nav className="navigation">
        <h1>Browse</h1>
        <ul>
            <li><NavLink to="/library/books" className="navigation-links" >All books</NavLink></li>
            <li><NavLink to="/library/books/borrowed/book" className="navigation-links" >Your books</NavLink></li>
        </ul>
    </nav>
    );
}

export default Navigation;
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">Savora</Link>
            </div>
            <div className="nav-links">
                <NavLink to="/" className="nav-link">Accueil</NavLink>
                <NavLink to="/plates" className="nav-link">Plats</NavLink>
                <NavLink to="/profile" className="nav-link">Profil</NavLink>
            </div>
        </nav>
    );
}
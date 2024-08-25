import React from 'react';
import "../assets/navbar.css";

export default function Navbar({ handleAddClick}) {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="../foodLogo.png" className="logo" alt="Food Logo"/>
        <p className="logo-text">Foodie</p>
      </div>
      <div className="nav-buttons">
        <button 
          className="nav-button" 
          onClick={handleAddClick} 
        >
          Add Item
        </button>
      </div>
    </nav>
  );
}
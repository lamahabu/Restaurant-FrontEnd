import React, { useEffect, useState } from 'react';
import "../assets/navbar.css";

export default function Navbar({ handleAddClick, addActive }) {
  const [showAdd, setShowAdd] = useState(addActive);
  useEffect(()=>{
    setShowAdd(addActive)
  },[addActive])

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => window.location.reload()}>
        <img src="../foodLogo.png" className="logo" alt="Food Logo" />
        <p className="logo-text">Foodie</p>
      </div>
      {showAdd &&
        <div className="nav-buttons">
          <button
            className="nav-button"
            onClick={handleAddClick}
          >
            Add Item
          </button>
        </div>
      }
    </nav>
  );
}
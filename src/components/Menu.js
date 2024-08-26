// src/components/CardsContainer.js
import React, { useState } from 'react';
import Item from './Item';
import "../assets/menu.css";

const Menu = ({ foodItems, drinkItems,setAddActive }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const handleCategoryButton=(category)=>{
    setCurrentPage(category);
    setAddActive(true);
  }

  return (
    <>{
      currentPage === "home" ?
        <div className="Menu-selection ">
          <h2>Select Category</h2>
          <button onClick={() => handleCategoryButton('food')}>Food</button>
          <button onClick={() => handleCategoryButton('drink')}>Drinks</button>
        </div>
        : currentPage === "food" ?
          <div className={`card food-card`}>
            <h2>Food</h2>
            <div className="items-grid">
              {
                foodItems.length > 0 ?
                  foodItems.map((item) => (
                    <Item key={item.id} item={item} type='food' />
                  ))

                  : (
                    <p>No Meals to display.</p>
                  )
              }
            </div>
          </div>
          :
          <div className={`card drink-card`}>
            <h2>Drinks</h2>
            <div className="items-grid">
              {
                drinkItems.length > 0 ?
                  drinkItems.map((item) => (
                    <Item key={item.id} item={item} type="drink" />
                  ))

                  : (
                    <p>No Drinks to display.</p>
                  )
              }
            </div>
          </div>
    }</>
  );
};

export default Menu;

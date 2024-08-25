// src/components/CardsContainer.js
import React from 'react';
import Item from './Item';
import "../assets/menu.css";

const Menu = ({ foodItems, drinkItems }) => {
 

  return (
    <div className="cards-container">
      

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



    </div>
  );
};

export default Menu;

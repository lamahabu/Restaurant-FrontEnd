import React from 'react';
import "../assets/categorySelection.css";
const CategorySelection = ({ onSelectCategory }) => {
  const handleCategoryClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className="category-selection">
      <h2>Select Category</h2>
      <button onClick={() => handleCategoryClick('food')}>Food</button>
      <button onClick={() => handleCategoryClick('drink')}>Drinks</button>
    </div>
  );
};

export default CategorySelection;

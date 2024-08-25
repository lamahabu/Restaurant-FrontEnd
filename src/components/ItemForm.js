import React, { useState, useEffect } from 'react';
import '../assets/categorySelection.css'; // Import the CSS for consistent theme

const ItemForm = ({ category, itemToEdit, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setPrice(itemToEdit.price);
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      name,
      price,
      id: itemToEdit ? itemToEdit.id : new Date().getTime(),
      category: category || 'default' // Default value to prevent null errors
    };
    onSave(item);
    onCancel();
  };

  return (
    <div className="category-selection"> {}
      <h2>{itemToEdit ? 'Edit Item' : `Add ${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Item'}`}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          required
        />
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Price" 
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default ItemForm;

import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import ItemForm from './components/ItemForm';
import CategorySelection from './components/CategorySelection';
import './App.css';

function App() {
  const [foodItems, setFoodItems] = useState([]);
  const [drinkItems, setDrinkItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addActive, setAddActive]=useState(false);

  useEffect(() => {
    const getFood = async () => {
      try {
        const response = await fetch("https://localhost:7195/api/Food/Get");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setFoodItems(data);
        return data;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const getDrinks = async () => {
      try {
        const response = await fetch("https://localhost:7195/api/Drink/Get");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setDrinkItems(data);
        return data;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    console.log("Fetching Data");
    getFood();
    getDrinks();
    console.log("Finished Fetching Data");
  }, [])

  const addItem = async (item) => {
    const newItem = {
      name: item.name,
      price: item.price
    }

    try {
      // Send the updated item to the server
      const response = await fetch(`https://localhost:7195/api/${item.category === 'food' ? 'Food' : 'Drink'}/Create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      item.category === 'food' ?
        setFoodItems([...foodItems, newItem])
        :
        setDrinkItems([...drinkItems, newItem])
      console.log("Added item:", result);

    } catch (error) {
      console.error("Error Adding item:", error);
    }


  };

  const handleAddClick = () => {
    setCategorySelected(null);
    setCategorySelected(true);
    setShowForm(false);
    
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setCategorySelected(false);
    setShowForm(true);
  };

  const handleSave = (item) => {

    addItem(item);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setCategorySelected(null);
  };

  return (
    <div className="App">
      <Navbar
        handleAddClick={handleAddClick} addActive ={addActive}
      />
      <div className="category-actions-container">
        {categorySelected && !showForm && (
          <CategorySelection onSelectCategory={handleCategorySelection} />
        )}
        {showForm && (
          <ItemForm
            onSave={handleSave}
            onCancel={handleCancel}
            category={selectedCategory}
          />
        )}
      </div>
      <Menu category={selectedCategory} drinkItems={drinkItems} foodItems={foodItems} setAddActive={setAddActive}/>
    </div>
  );
}

export default App;
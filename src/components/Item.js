import React, { useState } from 'react';
import "../assets/box.css";

const Item = ({ item, type }) => {
    const [editable, setEditable] = useState(false);
    const [itemName, setItemName] = useState(item.name);
    const [itemPrice, setItemPrice] = useState(item.price);

    const handleUpdateClick = () => {
        setEditable(true);
    };

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`https://localhost:7195/api/${type === 'food' ? 'Food' : 'Drink'}/Delete/${item.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Check if the response body exists before parsing it as JSON
            let result;
            const responseText = await response.text();
            if (responseText) {
                result = JSON.parse(responseText);
            }
            console.log("Deleted item:", result);
            window.location.reload();

        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handlePriceChange = (e) => {
        setItemPrice(e.target.value);
    };

    const handleNameChange = (e) => {
        setItemName(e.target.value);
    };

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            setEditable(false);

            const updatedItem = {
                id: item.id,
                name: itemName,
                price: itemPrice
            }

            try {
                // Send the updated item to the server
                const response = await fetch(`https://localhost:7195/api/${type === 'food' ? 'Food' : 'Drink'}/Update/${item.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedItem),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                console.log("Updated item:", result);

            } catch (error) {
                console.error("Error updating item:", error);
            }
            console.log("Updated item:", { name: itemName, price: itemPrice });
        }
    };

    return (
        <div className="features-boxed col-sm-6 col-md-4 col-lg-3 item">
            <div className="box">
                {
                    editable ?
                        <input
                            className="styled-input"
                            type="text"
                            value={itemName}
                            onChange={handleNameChange}
                            onKeyPress={handleKeyPress}
                            required
                        />
                        :
                        <h3 className="name">{itemName}</h3>
                }
                <div className="d-flex justify-content-center align-items-center">
                    {
                        editable ?
                            <input
                                className="styled-input"
                                type="number"
                                value={itemPrice}
                                onChange={handlePriceChange}
                                onKeyPress={handleKeyPress}
                                required
                            />
                            :
                            <span className="badge rounded-pill bg-danger price">${itemPrice}</span>
                    }
                </div>
                <button className="control-button" onClick={handleUpdateClick}>Update</button>
                <button className="control-button" onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    );
};

export default Item;

import React, { createContext, useContext, useState } from 'react';

// Create a context for the inventory
const InventoryContext = createContext();

// InventoryProvider component
export const InventoryProvider = ({ children }) => {
  // Initialize with default items
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Item 1', quantity: 10, location: 'A1', owner: 'John Doe' },
    { id: 2, name: 'Item 2', quantity: 5, location: 'B2', owner: 'Jane Smith' },
    { id: 3, name: 'Item 3', quantity: 20, location: 'C3', owner: 'Emily Davis' },
  ]);

  const handleAddItem = (newItem) => {
    setInventory((prevInventory) => [...prevInventory, newItem]);
  };

  const updateItem = (updatedItem) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const deleteItem = (itemId) => {
    setInventory((prevInventory) =>
      prevInventory.filter((item) => item.id !== itemId)
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        handleAddItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook to use the inventory context
export const useInventory = () => useContext(InventoryContext);

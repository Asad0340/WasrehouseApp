import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { useInventory } from './InventoryContext'; // Import the context

// Get screen dimensions
const { width } = Dimensions.get('window');

const NewItemScreen = ({ navigation }) => {
  const { handleAddItem } = useInventory(); // Use handleAddItem instead of addItem
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [owner, setOwner] = useState('');

  const addItem = () => {
    if (!name || !quantity || !location || !owner) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert('Error', 'Quantity must be a positive number.');
      return;
    }

    const newItem = {
      id: Date.now(), // or use a more robust ID generation method
      name,
      quantity: parseInt(quantity),
      location,
      owner,
    };
    handleAddItem(newItem); // Call handleAddItem
    Alert.alert('Success', 'Item added successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Owner"
        value={owner}
        onChangeText={setOwner}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={addItem}
      >
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#dee2e6',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    fontSize: width * 0.045,
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: width * 0.05,
    fontWeight: '700',
  },
});

export default NewItemScreen;
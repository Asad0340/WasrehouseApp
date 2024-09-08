import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { useInventory } from './InventoryContext';

// Get screen dimensions
const { width } = Dimensions.get('window');

const ItemDetailScreen = ({ route, navigation }) => {
  const { item } = route.params || {}; // Use default empty object if params is undefined
  const { updateItem, deleteItem } = useInventory();

  // Initialize state only if item is defined
  const [name, setName] = useState(item ? item.name : '');
  const [quantity, setQuantity] = useState(item ? item.quantity.toString() : '');
  const [location, setLocation] = useState(item ? item.location : '');
  const [owner, setOwner] = useState(item ? item.owner : '');

  const handleUpdate = () => {
    if (item) {
      const updatedItem = { ...item, name, quantity: parseInt(quantity, 10), location, owner };
      updateItem(updatedItem);
      Alert.alert('Success', 'Item updated successfully!');
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    if (item) {
      deleteItem(item.id);
      Alert.alert('Success', 'Item deleted successfully!');
      navigation.goBack();
    }
  };

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.noItemText}>No item data found!</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back to Inventory</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
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
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to Inventory</Text>
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
    borderColor: '#ced4da',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: width * 0.045,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  updateButton: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  backButton: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '700',
  },
  noItemText: {
    fontSize: width * 0.06,
    textAlign: 'center',
    color: '#212529',
    marginBottom: 20,
  },
});

export default ItemDetailScreen;

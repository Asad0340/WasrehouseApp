import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useInventory } from './InventoryContext';

// Get screen dimensions
const { width } = Dimensions.get('window');

const InventoryItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.itemContainer}
    onPress={() => navigation.navigate('ItemDetail', { item })}
  >
    <Text style={styles.itemName}>Name: {item.name}</Text>
    <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
    <Text style={styles.itemDetail}>Location: {item.location}</Text>
    <Text style={styles.itemDetail}>Owner: {item.owner}</Text>
  </TouchableOpacity>
);

const InventoryScreen = ({ navigation }) => {
  const { inventory } = useInventory(); // No need to use userRole
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Warehouse Inventory</Text>
      <TextInput
        placeholder="Search by name"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredInventory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <InventoryItem
            item={item}
            navigation={navigation}
          />
        )}
      />
      {/* Show button to everyone */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NewItem')}
      >
        <Text style={styles.addButtonText}>Add New Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    width: width - 40, // Adjust width to be responsive
    alignSelf: 'center', // Center align item containers
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemDetail: {
    fontSize: 16,
    color: '#666',
    marginVertical: 2,
  },
  searchInput: {
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: '#ced4da',
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default InventoryScreen;

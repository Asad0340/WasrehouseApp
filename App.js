import React, { useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { InventoryProvider } from './Screens/InventoryContext';
import { Text, View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginScreen from './Screens/LoginScreen';
import InventoryScreen from './Screens/InventoryScreen';
import ItemDetailScreen from './Screens/ItemDetailScreen';
import NewItemScreen from './Screens/NewItemScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

// Custom Header Component with Animation
const CustomHeader = ({ title }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity
  const slideAnim = useRef(new Animated.Value(-100)).current; // Initial value for slide

  useEffect(() => {
    // Animation: Slide and fade in the header
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <LinearGradient
        colors={['#007BFF', '#00C6FF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Icon name="inventory" size={30} color="#fff" />
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const App = () => {
  return (
    <InventoryProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Customized Login Header */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              header: () => <CustomHeader title="Login" />,
              headerStyle: {
                height: 100, // Adjust height for larger header
              },
            }}
          />

          {/* Customized Inventory Header */}
          <Stack.Screen
            name="Inventory"
            component={InventoryScreen}
            options={{
              header: () => <CustomHeader title="Inventory" />,
              headerStyle: {
                height: 100,
              },
            }}
          />

          {/* Customized Item Detail Header */}
          <Stack.Screen
            name="ItemDetail"
            component={ItemDetailScreen}
            options={{
              header: () => <CustomHeader title="Item Detail" />,
              headerStyle: {
                height: 100,
              },
            }}
          />

          {/* Customized New Item Header */}
          <Stack.Screen
            name="NewItem"
            component={NewItemScreen}
            options={{
              header: () => <CustomHeader title="Add New Item" />,
              headerStyle: {
                height: 100,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </InventoryProvider>
  );
};

// Styles for Custom Header
const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6, // Adds shadow on Android
    borderBottomLeftRadius: 15, // Rounded bottom corners
    borderBottomRightRadius: 15,
    overflow: 'hidden', // Ensures gradient fits within rounded corners
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default App;

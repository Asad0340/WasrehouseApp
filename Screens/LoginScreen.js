import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Animated, Dimensions, Keyboard } from 'react-native';

const { width } = Dimensions.get('window');

const users = [
  { username: 'asad', password: 'asad' },
  { username: 'john', password: 'doe' },
  { username: 'jane', password: 'smith' },
];

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation for fade in
  const inputSlideAnim = useRef(new Animated.Value(width)).current; // Slide-in animation for inputs
  const buttonScaleAnim = useRef(new Animated.Value(1)).current; // Animation for button scaling

  useEffect(() => {
    // Animate inputs and title on component mount
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(inputSlideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, inputSlideAnim]);

  const handleLogin = () => {
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      // Reset navigation stack and navigate to Inventory screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Inventory' }],
      });
    } else {
      Alert.alert('Invalid Credentials', 'Please try again.');
    }
  };

  const animateButtonPress = () => {
    // Animate button press effect
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(handleLogin);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Animated.View style={[styles.titleContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Login</Text>
      </Animated.View>

      {/* Input Fields */}
      <Animated.View style={[styles.inputContainer, { transform: [{ translateX: inputSlideAnim }] }]}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
          autoCapitalize="none"
        />
      </Animated.View>

      {/* Button */}
      <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
        <TouchableOpacity style={styles.button} onPress={animateButtonPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: '#ced4da',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: width * 0.045,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: '700',
  },
});

export default LoginScreen;

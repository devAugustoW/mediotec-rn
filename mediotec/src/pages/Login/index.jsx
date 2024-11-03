import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

import logo from '../../assets/mediotec-logo.png';

const Login = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    console.log(`Login Usuário: ${user} - senha: ${password}`)
		navigation.navigate('TabNavigator', { screen: 'Home' });
  };

  const forgotPasswordScreen = () => {
    navigation.navigate('ForgotPassword')
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} />
      </View>
			
      <View style={styles.formContainer}>
        <TextInput style={styles.input}
          placeholder="Usuário"
          value={user}
          onChangeText={setUser}
        />
        <TextInput style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={forgotPasswordScreen}>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
		justifyContent: 'center',		
    backgroundColor: '#fff',
  },
  logoContainer: {
    padding: 10,
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding:10,
		paddingLeft: 20,
		borderRadius: 50,
		marginBottom: 20,
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
		borderRadius: 50,
    alignItems: 'center',
		marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;

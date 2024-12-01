import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import logo from "../../assets/mediotec-logo.png";

// Componente principal da tela de login
const Login = ({ navigation }) => {
  // Estados para controlar os campos do formulário
  const [email, setEmail] = useState("aluno1@mediotec.com");
  const [password, setPassword] = useState("12345678");

  // Função que realiza o processo de login
  const handleLogin = async () => {
    const user = { email, password };

    try {
      // Faz a requisição de login para a API
      const response = await axios.post(`https://4.228.217.50/api/auth/login`,user);

      // Verifica se a resposta contém os dados necessários
      if (response.data && response.data.data) {
        const token = response.data.data.token;
        const user = response.data.data.user;

        // Verifica se o token e os dados do usuário foram recebidos
        if (token && user) {
          Alert.alert("Login realizado com sucesso!");

          // Armazena os dados do usuário localmente
          await AsyncStorage.setItem("token", String(token));
          await AsyncStorage.setItem("userName", user.name);
          await AsyncStorage.setItem("userData", JSON.stringify(user));

          // Navega para a tela inicial
          navigation.navigate("TabNavigator", { screen: "Home" });
        } else {
          Alert.alert("Login falhou.", "Token ou usuário não encontrado.");
        }
      } else {
        Alert.alert("Login falhou.", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Requisição falhou!");
    }
  };

  // Função que navega para a tela de recuperação de senha
  const forgotPasswordScreen = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={styles.container}>
      {/* Container do logo */}
      <View style={styles.logoContainer}>
        <Image source={logo} />
      </View>

      {/* Formulário de login */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
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

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    padding: 10,
    alignItems: "center",
  },
  logoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
    borderColor: "#ddd",
    padding: 10,
    paddingLeft: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#333",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Login;

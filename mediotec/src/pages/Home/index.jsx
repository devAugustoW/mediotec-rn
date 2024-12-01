import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import userImg from "../../assets/user-img.png";
import Cards from "../../components/cards";

export default function Home() {
  const navigation = useNavigation();
  // Estados para controlar o menu expandido
  const [expanded, setExpanded] = useState(false);
  const [userName, setUserName] = useState("");

  // Effect que busca o nome do usuário no AsyncStorage quando o componente carrega
  useEffect(() => {
    const getUserName = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        if (name) {
          setUserName(name);
        }
      } catch (error) {
        console.error("Failed to retrieve userName:", error);
      }
    };
    getUserName();
  }, []);

  // Função que controla a expansão/retração do menu de opções do perfil
  function toggleExpanded() {
    setExpanded(!expanded);
  }

  // Função que realiza a navegação para outras telas
  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  // Array de objetos que define os cards da tela inicial
  const cardData = [
    { iconName: "people", label: "Minha turma", screenName: "MyClass" },
    { iconName: "chatbubbles", label: "Comunicados", screenName: "Comunications" },
    { iconName: "call", label: "Contatos", screenName: "Contacts" },
    { iconName: "cash", label: "Financeiro", screenName: "Financial" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Olá, {userName}!</Text>
        <TouchableOpacity
          style={styles.profileIconContainer}
          onPress={toggleExpanded}
        >
          <Image
            source={userImg}
            style={styles.profileIcon}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {expanded && (
          <View style={styles.optionsContainer}>
            <View style={styles.option}>
              <Ionicons name="camera-outline" size={20} color="black" />
              <Text style={styles.optionText}>Alterar foto</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.option}>
              <Ionicons name="shield-half-outline" size={20} color="black" />
              <Text style={styles.optionText}>Alterar senha</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.option}>
              <Ionicons name="log-out-outline" size={20} color="black" />
              <Text style={styles.optionText}>Sair</Text>
            </View>
            <View style={styles.separator} />
          </View>
        )}
      </View>

      <View style={styles.gridContainer}>
        {cardData.map((card, index) => (
          <View key={index} style={styles.cardWrapper}>
            <Cards
              iconName={card.iconName}
              label={card.label}
              onPress={() => handleNavigation(card.screenName)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    marginTop: 30,
  },
  greetingContainer: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    width: "98%",
    marginVertical: 10,
    borderRadius: 30,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 15,
    top: 15,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  cardWrapper: {
    width: "30%",
    margin: 10,
    alignItems: "center",
  },
  cardTouchable: {
    width: "100%",
    alignItems: "center",
  },
});

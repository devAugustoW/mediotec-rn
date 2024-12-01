import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import Login from "./src/pages/Login";
import ForgotPassword from "./src/pages/ForgotPassword";

import Home from "./src/pages/Home";
import Schedule from "./src/pages/Schedule";
import Statistics from "./src/pages/Statistics";

import MyClass from "./src/pages/MyClass";
import DisciplineDetails from "./src/pages/DisciplineDetails";
import Comunications from "./src/pages/Comunications";
import Contacts from "./src/pages/Contacts";
import Financial from "./src/pages/Financial";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Agenda") iconName = "calendar-outline";
          else if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Estatísticas") iconName = "pie-chart-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Agenda"
        component={Schedule}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Estatísticas"
        component={Statistics}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [userName, setUserName] = useState("");

  // Busca o nome do usuário quando o app inicia
  useEffect(() => {
    const getUserName = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        if (name) {
          setUserName(name);
        }
      } catch (error) {
        console.error("Erro ao buscar nome do usuário:", error);
      }
    };
    getUserName();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ 
						headerShown: true, 
						headerTitle: "Voltar para login" }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyClass"
          component={MyClass}
          options={{ headerTitle: userName }}
        />

        <Stack.Screen
          name="DisciplineDetails"
          component={DisciplineDetails}
          options={{ headerTitle: userName }}
        />
        <Stack.Screen
          name="Comunications"
          component={Comunications}
          options={{ headerTitle: userName }}
        />
        <Stack.Screen
          name="Contacts"
          component={Contacts}
          options={{ headerTitle: userName }}
        />
        <Stack.Screen
          name="Financial"
          component={Financial}
          options={{ headerTitle: userName }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

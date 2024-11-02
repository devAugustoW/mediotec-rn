import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet, Text, View } from 'react-native';
import { navigationRef } from './src/navigation/navigationRef';

import Login from './src/pages/Login';
import Home from './src/pages/Home';
import ForgotPassword from './src/pages/ForgotPassword';
import Disciplines from './src/pages/Disciplines';
import Schedule from './src/pages/Schedule'
import Concepts from './src/pages/Concepts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Agenda') {
            iconName = 'calendar-outline'; 
          } else if (route.name === 'Home') {
            iconName = 'home-outline'; 
          } else if (route.name === 'Estatísticas') {
            iconName = 'eye-outline'; 
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
			<Tab.Screen name="Agenda" component={Schedule} options={{ headerShown: true }} />
			<Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
			<Tab.Screen name="Estatísticas" component={ForgotPassword} options={{ headerShown: false }} />
		</Tab.Navigator>
		);
	}

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Group>
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }}/>
          <Stack.Screen name="Disciplines" component={Disciplines} />
          <Stack.Screen name="Concepts" component={Concepts} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

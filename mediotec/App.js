import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from './src/pages/Login';
import ForgotPassword from './src/pages/ForgotPassword';

import Home from './src/pages/Home';
import Schedule from './src/pages/Schedule';

import Disciplines from './src/pages/Disciplines';
import MyClass from './src/pages/MyClass';
import Concepts from './src/pages/Concepts';
import Comunications from './src/pages/Comunications';
import Contacts from './src/pages/Contacts';
import Financial from './src/pages/Financial'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator 
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Agenda') iconName = 'calendar-outline';
          else if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Estatísticas') iconName = 'eye-outline';

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
				<Stack.Screen name="Disciplines" component={Disciplines} />
				<Stack.Screen name="MyClass" component={MyClass} />
				<Stack.Screen name="Concepts" component={Concepts} />
				<Stack.Screen name="Comunications" component={Comunications} />    
				<Stack.Screen name="Contacts" component={Contacts} />
				<Stack.Screen name="Financial" component={Financial} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
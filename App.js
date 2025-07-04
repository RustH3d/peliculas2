import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import UserMoviesScreen from './screens/UserMoviesScreen';
import ReviewMoviesScreen from './screens/ReviewMoviesScreen'; // ← cambia el nombre del archivo también si es necesario

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserMovies" component={UserMoviesScreen} />
        <Stack.Screen name="ReviewMovies" component={ReviewMoviesScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
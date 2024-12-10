import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import PokemonDetailScreen from './src/screens/PokemonDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'Pokédex',
            headerStyle: {
              backgroundColor: '#FF0000',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="PokemonDetail" 
          component={PokemonDetailScreen}
          options={({ route }) => ({ 
            title: route.params?.name,
            headerStyle: {
              backgroundColor: '#FF0000',
            },
            headerTintColor: '#fff',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
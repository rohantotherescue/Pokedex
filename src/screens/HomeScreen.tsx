import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { PokemonService } from '../services/PokemonService';

const HomeScreen = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const numColumns = Math.floor(width / 180);

  useEffect(() => {
    loadRandomPokemons();
  }, []);

  const loadRandomPokemons = async () => {
    setIsLoading(true);
    try {
      const pokemonService = new PokemonService();
      const randomPokemons = await pokemonService.getRandomPokemons(50);
      setPokemons(randomPokemons.filter(pokemon => pokemon !== null));
    } catch (error) {
      console.error('Error loading pokemons:', error);
    }
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const pokemonService = new PokemonService();
      const pokemon = await pokemonService.searchPokemon(searchQuery.toLowerCase());
      if (pokemon) {
        navigation.navigate('PokemonDetail', pokemon);
      }
    } catch (error) {
      Alert.alert('Not Found', 'Oops! This pokemon does not exist');
    }
    setIsLoading(false);
  };

  const renderPokemonCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PokemonDetail', item)}
    >
      <Text style={styles.pokemonName}>{item.name}</Text>
      <Image
        source={{ uri: item.images[0] }}
        style={styles.pokemonImage}
        resizeMode="contain"
      />
      <Text style={styles.pokemonType}>{item.types[0]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Pokémon..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#FF0000" />
      ) : (
        <FlatList
          data={pokemons}
          renderItem={renderPokemonCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
  },
  pokemonImage: {
    width: 120,
    height: 120,
  },
  pokemonType: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'flex-end',
  },
});

export default HomeScreen;
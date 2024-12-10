import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { PokemonService } from '../services/PokemonService';
import { Pokemon } from '../types/pokemon';

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const pokemonService = new PokemonService();

  useEffect(() => {
    loadRandomPokemons();
  }, []);

  const loadRandomPokemons = async () => {
    setIsLoading(true);
    try {
      const randomPokemons = await pokemonService.getRandomPokemons(50);
      setPokemons(randomPokemons.filter(pokemon => pokemon !== null));
    } catch (error) {
      console.error('Error loading pokemons:', error);
    }
    setIsLoading(false);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      const pokemon = await pokemonService.searchPokemon(query.toLowerCase());
      if (pokemon) {
        navigate(`/pokemon/${pokemon.name.toLowerCase()}`);
      }
    } catch (error) {
      alert('Oops! This pokemon does not exist');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-red-600 text-center mb-8">Pokédex</h1>
      <SearchBar onSearch={handleSearch} />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => navigate(`/pokemon/${pokemon.name.toLowerCase()}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
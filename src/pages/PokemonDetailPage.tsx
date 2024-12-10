import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PokemonService } from '../services/PokemonService';
import { Pokemon } from '../types/pokemon';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function PokemonDetailPage() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { name } = useParams();
  const navigate = useNavigate();
  const pokemonService = new PokemonService();

  useEffect(() => {
    if (name) {
      loadPokemon(name);
    }
  }, [name]);

  const loadPokemon = async (pokemonName: string) => {
    try {
      setIsLoading(true);
      const data = await pokemonService.searchPokemon(pokemonName);
      setPokemon(data);
    } catch (error) {
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const nextImage = () => {
    if (pokemon) {
      setCurrentImageIndex((prev) => 
        prev === pokemon.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (pokemon) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? pokemon.images.length - 1 : prev - 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-red-600 hover:text-red-700 mb-6"
      >
        <ArrowLeftIcon className="h-6 w-6 mr-2" />
        Back to list
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">{pokemon.name}</h1>

        <div className="relative">
          <div className="flex justify-center items-center mb-8 relative">
            <button
              onClick={previousImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors duration-200"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            
            <img
              src={pokemon.images[currentImageIndex]}
              alt={pokemon.name}
              className="h-64 w-64 object-contain"
            />
            
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors duration-200"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex justify-center gap-2 mb-6">
            {pokemon.images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentImageIndex === index ? 'bg-red-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Types</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Stats</h2>
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="capitalize">{stat.name}</span>
                  <span>{stat.value}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-red-600 rounded"
                    style={{ width: `${(stat.value / 255) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Moves</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.moves.map((move) => (
                <span
                  key={move}
                  className="px-3 py-1 bg-gray-100 rounded-lg text-sm"
                >
                  {move}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Physical Characteristics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Height</p>
                <p className="text-xl font-semibold">{pokemon.height}m</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Weight</p>
                <p className="text-xl font-semibold">{pokemon.weight}kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
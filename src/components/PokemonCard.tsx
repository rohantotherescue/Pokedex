import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="relative">
        <h3 className="text-lg font-semibold text-left">{pokemon.name}</h3>
        <div className="flex justify-center my-4">
          <img
            src={pokemon.images[0]}
            alt={pokemon.name}
            className="h-32 w-32 object-contain"
          />
        </div>
        <span className="absolute bottom-0 right-0 px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
          {pokemon.types[0]}
        </span>
      </div>
    </div>
  );
}
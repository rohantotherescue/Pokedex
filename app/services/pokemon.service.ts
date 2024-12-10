import axios from 'axios';

export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  async getRandomPokemons(limit: number = 50): Promise<any[]> {
    try {
      const totalPokemons = 898; // Total number of Pokémon
      const randomIds = new Set<number>();
      
      while (randomIds.size < limit) {
        randomIds.add(Math.floor(Math.random() * totalPokemons) + 1);
      }

      const pokemonPromises = Array.from(randomIds).map(id => 
        this.getPokemonById(id)
      );

      return await Promise.all(pokemonPromises);
    } catch (error) {
      console.error('Error fetching random pokemons:', error);
      return [];
    }
  }

  async searchPokemon(name: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/pokemon/${name.toLowerCase()}`);
      return this.formatPokemonData(response.data);
    } catch (error) {
      throw new Error('Pokemon not found');
    }
  }

  async getPokemonById(id: number): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/pokemon/${id}`);
      return this.formatPokemonData(response.data);
    } catch (error) {
      console.error(`Error fetching pokemon ${id}:`, error);
      return null;
    }
  }

  private formatPokemonData(data: any) {
    return {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      types: data.types.map(t => t.type.name),
      images: [
        data.sprites.front_default,
        data.sprites.back_default,
        data.sprites.front_shiny,
        data.sprites.back_shiny
      ].filter(Boolean),
      stats: data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat
      })),
      moves: data.moves.slice(0, 4).map(m => m.move.name),
      height: data.height / 10, // Convert to meters
      weight: data.weight / 10  // Convert to kg
    };
  }
}
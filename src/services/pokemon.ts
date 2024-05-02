import { Injectable } from '@nestjs/common';

export type Pokemon = {
  id: number;
  name: string;
};

@Injectable()
export class PokemonService {
  private pokemonList: Pokemon[] = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Ivysaur' },
    { id: 3, name: 'Venusaur' },
    { id: 4, name: 'Charmander' },
    { id: 5, name: 'Charmeleon' },
    { id: 6, name: 'Charizard' },
    { id: 7, name: 'Squirtle' },
    { id: 8, name: 'Wartortle' },
    { id: 9, name: 'Blastoise' },
  ];

  findPokemonById(id: number): Pokemon | undefined {
    return this.pokemonList.find((p) => p.id === id);
  }

  findPokemonByName(name: string): Pokemon | undefined {
    return this.pokemonList.find((p) => p.name === name);
  }

  getPokemonList(page?: number): { list: Pokemon[]; count: number } {
    if (!page) {
      return { list: this.pokemonList, count: this.pokemonList.length };
    }
    return {
      list: this.pokemonList.slice((page - 1) * 5, page * 5),
      count: this.pokemonList.length,
    };
  }

  addPokemon(pokemon: Pokemon): Pokemon {
    if (this.pokemonList.some((p) => p.id === pokemon.id)) {
      throw new Error('Pokemon already exists');
    }
    this.pokemonList.push(pokemon);
    return pokemon;
  }

  deletePokemon(pokemonId: number): Pokemon {
    const index = this.pokemonList.findIndex((pokemon) => pokemon.id === pokemonId);
    if (index === -1) {
      throw new Error('Pokemon not found');
    }
    return this.pokemonList.splice(index, 1)[0];
  }
}
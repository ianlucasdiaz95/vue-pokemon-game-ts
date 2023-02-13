import { Pokemon } from './../interfaces/pokemon';
import { defineStore } from 'pinia';

interface PokemonState {
    pokemonArr: Pokemon[];
    pokemon: Pokemon | undefined;
    showPokemon: boolean;
    showAnswer: boolean;
    message: string;
}

export const usePokemonStore = defineStore('pokemon', {
    state: (): PokemonState => ({
        pokemonArr: [],
        pokemon: undefined,
        showPokemon: false,
        showAnswer: false,
        message: ''
    }),
    actions: {
        loadPokemons( pokemons: Pokemon[] ){
            this.pokemonArr = pokemons;
        },
        setHiddenPokemon(pokemon: Pokemon){
            this.pokemon = pokemon;
        },
        showPokemonAndAnswer(message: string){
            this.showPokemon = true;
            this.showAnswer = true;
            this.message= message;
        },
        clearState(){
            this.pokemonArr = [];
            this.pokemon = undefined;
            this.showPokemon = false;
            this.showAnswer = false;
            this.message = '';
        }
    }
})
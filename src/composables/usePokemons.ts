import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { usePokemonStore } from '../store/pokemonStore';
import getPokemonOptions from '../helpers/getPokemonOptions'

export const usePokemons = () => {

    //Store
    const pokemonStore = usePokemonStore();

    const {
        pokemonArr,
        pokemon,
        showAnswer,
        showPokemon,
        message
    } = storeToRefs(pokemonStore);

    async function mixPokemonArray() {
        pokemonStore.loadPokemons(await getPokemonOptions());
        pokemonArr.value = await getPokemonOptions()

        const rndInt = Math.floor(Math.random() * 4)

        pokemonStore.setHiddenPokemon(pokemonArr.value[rndInt]);
    }

    function checkAnswer(selectedId: number) {
        if (!pokemon.value) return;

        showPokemon.value = true
        showAnswer.value = true

        if (selectedId === pokemon.value.id) {
            pokemonStore.showPokemonAndAnswer(`Correcto, ${pokemon.value.name}`)
        } else {
            pokemonStore.showPokemonAndAnswer(`Oops, era ${pokemon.value.name}`)
        }

    }

    function newGame() {

        pokemonStore.clearState();
        mixPokemonArray();

    }

    return {
        //Data
        pokemonArr,
        pokemon,
        showAnswer,
        showPokemon,
        message,

        //Computed
        imgSrc: computed(() => { return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.value?.id}.svg` }),

        //Methods
        mixPokemonArray,
        checkAnswer,
        newGame
    }
}
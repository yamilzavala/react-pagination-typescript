import { pokemonApi } from "../api/pokemonApi"
import { FetchAllPokemonResponse, Pokemon, SmallPokemon } from "../interfaces/fetchAllPokemonResponse";

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
    const resp = await pokemonApi.get<FetchAllPokemonResponse>('/pokemon?limit=1500');
    const pokemonList = resp.data.results;
    return transformSmallPokemonIntoPokemon(pokemonList)
}

const transformSmallPokemonIntoPokemon = (data: SmallPokemon[]): Pokemon[] => {
    return data.map(pokemon => {
        const id =  Number(pokemon.url.split('/')[6])
        return {
            id,
            name: pokemon.name,
            pic: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }        
    })
}

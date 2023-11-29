import {useState, useEffect} from 'react';
import {fetchAllPokemons} from '../helpers/fetchAllPokemon';
import {Pokemon} from '../interfaces/fetchAllPokemonResponse'

export const useFetch = () =>  {
    const [data, setData] = useState<Pokemon[]>([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      try {
        fetchAllPokemons().then(results => {
            setData(results);
            setLoading(false)
        })
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    
    }, [])

    return {
        data,
        error,
        loading
    }
} 
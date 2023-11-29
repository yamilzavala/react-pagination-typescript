import { useFetch } from '../hooks/useFetch';
import Loading from '../components/Loading';
import Error from '../components/Error';
import {useState} from 'react';
import { Pokemon } from '../interfaces/fetchAllPokemonResponse';

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const {data, error, loading} = useFetch();

    const filteredPokemons = (): Pokemon[] => {
        if(!inputValue.length) return data.slice(currentPage,currentPage + 5);
       
        return data
                .filter(poke => poke.name.includes(inputValue))
                .slice(currentPage,currentPage + 5)
    }

    const handleNextPage = () => {
        if(data.filter(poke => poke.name.includes(inputValue)).length > currentPage + 5) {
            setCurrentPage(currentPage + 5)
        }
    }

    const handlePreviousPage = () => {
        if(currentPage - 5 > 0) {
            setCurrentPage(currentPage - 5)
        }
    }

    const renderedPokemons = filteredPokemons().map(({id, name, pic}, idx) => (
        <tr key={idx}>
            <td>{id}</td>
            <td>{name}</td>
            <td>
                <img src={pic} alt={name} style={{height: 75}}/>
            </td>
        </tr>
    ))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(0)
        setInputValue(e.target.value)
    }

    return (
        <div className="mt-5">
            <h1>Pokemon list</h1>
            <hr/>

            <input 
                className='mb-5 form-control'
                type="text" 
                placeholder="Enter a name"
                value={inputValue}
                onChange={handleChange} />

            <button className='btn btn-primary' style={{margin: 10}} onClick={handlePreviousPage}>Previous</button>
            <button className='btn btn-primary' onClick={handleNextPage}>Next</button>

            <table>
                <thead>
                    <tr>
                        <th style={{width: 100}}>id</th>
                        <th style={{width: 150}}>name</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedPokemons}
                </tbody>
            </table>
            {loading && <Loading/>}
            {error && <Error/>}
        </div>
    );
};

export default HomePage;
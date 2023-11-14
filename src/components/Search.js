import { React, useCallback, useContext, useState } from 'react'
import SearchResults from './SearchResults';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import ThemeContext from '../context/ThemeContext';
import { searchSymbols } from '../api/StockApi';

const Search = () => {
    // Tracks the user's query to find stock
    const [input, setInput] = useState("");
    // Best matches
    const [bestMatches, setBestMatches] = useState([]);

    // Clearn input and matches
    const clear = () => {
        setInput("");
        setBestMatches([]);
    }

    // Get best matches from Finnhub API
    const updateBestMatches = async () => {
        try {
            if (input) {
                const searchResults = await searchSymbols(input);
                const result = searchResults.result;
                setBestMatches(result);
            }
        } catch (error) {
            setBestMatches([]);
            console.log(error);
        }
    }

    const {darkMode} = useContext(ThemeContext);
  return (
    <div className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-neutral-200'}`}>
        <input
            type='text'
            value={input}
            className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
            placeholder='Search Stock'      
            onChange={(event) => {setInput(event.target.value)}}
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    updateBestMatches();
                }
            }}
        />

        {input && (
            <button onClick={clear}>
                <XMarkIcon className='h-4 w-4 fill-gray-500 mr-3' />
            </button>
        )}

        <button onClick={updateBestMatches} className='w-8 h-8 bg-[#ff3856] rounded-md flex justify-center items-center m-1 p-2'>
            <MagnifyingGlassIcon className='w-4 h-4 fill-gray-100'/>
        </button>

        {input && bestMatches.length > 0 ? (
            <SearchResults results={ bestMatches } />
        ) : null}
    </div>
  )
}

export default Search
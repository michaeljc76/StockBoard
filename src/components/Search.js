import { React, useState } from 'react'
import { mockSearchResults } from '../constants/mock';
import SearchResults from './SearchResults';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Search = () => {
    // Tracks the user's query to find stock
    const [input, setInput] = useState("");
    // Best matches
    const [bestMatches, setBestMatches] = useState(mockSearchResults.result);

    // Clearn input and matches
    const clear = () => {
        setInput("");
        setBestMatches([]);
    }

    // Get best matches from Finnhub API
    const updateBestMatches = () => {
        setBestMatches(mockSearchResults.result);
    }

  return (
    <div className='flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200'>
        <input
            type='text'
            value={input}
            className='w-full px-4 py-2 focus:outline-none rounded-md'
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
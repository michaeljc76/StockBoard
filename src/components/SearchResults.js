import React from 'react'

const SearchResults = ({ results }) => {
  return (
    <ul className='absolute top-12 border-2 w-full h-64 rounded-md overflow-y-scroll bg-white border-neutral-200 stock-scrollbar'>
        { results.map((item) => {
            return <li key={item.symbol} className='cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-gray-100'>
                <span>{item.symbol}</span>
                <span>{item.description}</span>
            </li>;
        }) }
    </ul>
  )
}

export default SearchResults
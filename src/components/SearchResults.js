import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext';
import StockContext from '../context/StockContext';

const SearchResults = ({ results }) => {
  const {darkMode} = useContext(ThemeContext);
  const {setStockSymbol} = useContext(StockContext);
  return (
    <ul className={`absolute top-12 border-2 w-full h-64 rounded-md overflow-y-scroll ${darkMode ? 'bg-gray-900 border-gray-800 stock-scrollbar stock-scrollbar-dark' : 'bg-white border-neutral-200 stock-scrollbar'}`}>
        { results.map((item) => {
            return (
            <li key={item.symbol} className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} onClick={() => {
              setStockSymbol(item.symbol);
            }}>
                <span>{item.symbol}</span>
                <span>{item.description}</span>
            </li>
            );
        }) };
    </ul>
  )
}

export default SearchResults;
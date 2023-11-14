import React, { useContext } from 'react'
import Card from './Card'
import ThemeContext from '../context/ThemeContext';

const Details = ({ details }) => {
    const detailsList = {
        name: 'Name',
        country: 'Country',
        currency: 'Currency',
        exchange: 'Exchange',
        ipo: 'IPO Date',
        marketCapitalization: 'Market Capitalization',
        finnhubIndustry: 'Industry',
    };

    const millionToBillion = (number) => {
        return (number / 1000).toFixed(2);
    };

    const { darkMode } = useContext(ThemeContext);
  return (
    <Card>
        <ul className={`w-full h-full flex flex-col justify-between divide-y-1 ${darkMode ? 'divide-gray-400': null}`}>
            {Object.keys(detailsList).map((item) => {
                return (
                    <li key={item} className='flex-1 flex justify-between items-center'>
                        <span>{detailsList[item]}</span>
                        <span>{item === 'marketCapitalization' ? `${millionToBillion(details[item])}B` : details[item]}</span>
                    </li>
                );
            })}
        </ul>
    </Card>
  )
}

export default Details
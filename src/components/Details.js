import React from 'react'
import Card from './Card'
import { mockCompanyDetails } from '../constants/mock'

const Details = () => {
    const detailList = {
        name: 'Name',
        country: 'Country',
        currency: 'Currency',
        exchange: 'Exchange',
        ipo: 'IPO Date',
        marketCapitalization: 'Market Capitalization',
        finnhubIndustry: 'Industry',
    };

    const millionToBillion = () => {
        return (number / 1000).toFixed(2);
    }

  return (
    <Card>
        <ul className='w-full h-full flex flex-col justify-between divide-y-1'>
            {Object.keys(detailList).map((item) => {
                return <li key={item}></li>
            })}
        </ul>
    </Card>
  )
}

export default Details
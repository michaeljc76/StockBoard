import React, { useState } from 'react'
import { mockHistoricalData } from '../constants/mock'
import { unixToDate, dateToUnix, createDate } from '../helpers/datehelper';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from './Card';
import { chartConfig } from '../constants/config';
import ChartFilter from './ChartFilter';

const Chart = () => {
    const [data, setData] = useState(mockHistoricalData);
    const [filter, setFilter] = useState("1W")

    const formatData = () => {
        return data.c.map((item, index) => {
            return {
                value: item.toFixed(2),
                date: unixToDate(data.t[index]),
            };
        });
    };

  return (
    <Card>
        <ul className='flex absolute top-2 right-2 z-40'>
            {Object.keys(chartConfig).map((item) => {
                return (  
                    <li key={item}>
                        <ChartFilter text={item} active={filter === item} onClick={() => {
                            setFilter(item)
                        }}/>
                    </li>
                )
            })}
        </ul>
        <ResponsiveContainer>
            <AreaChart data={formatData(data)}>
                <Area type='monotone' dataKey='value' stroke='#312e81' fillOpacity={1} strokeWidth={0.5} fill='url(#chartColor)'/>
                <Tooltip />
                <XAxis dataKey={"date"}/>
                <YAxis domain={["dataMin", "dataMax"]} />
                <defs>
                    <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff3856" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ff3856" stopOpacity={0}/>
                    </linearGradient>
                </defs>
            </AreaChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default Chart
import React, { useContext, useState, useEffect } from 'react'
import { unixToDate, dateToUnix, createDate } from '../helpers/datehelper';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from './Card';
import { chartConfig } from '../constants/config';
import ChartFilter from './ChartFilter';
import ThemeContext from '../context/ThemeContext';
import StockContext from '../context/StockContext'
import { getHistoricalData } from '../api/StockApi';
import moment from 'moment/moment';

const Chart = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("1W")

    const formatData = (data) => {
        return data.c.map((item, index) => {
            return {
                value: item.toFixed(2),
                date: unixToDate(data.t[index]),
            };
        });
    };

    const { darkMode } = useContext(ThemeContext);
    const { stockSymbol } = useContext(StockContext);

    useEffect(() => {
        const getDateRange = () => {
            const {days, weeks, months, years} = chartConfig[filter];
            const endDate = new Date();
            // Subtract days, weeks, months, years, from current date to backtrack that amount
            const startDate = createDate(endDate, -days, -weeks, -months, -years);
        
            const startTimestampUnix = dateToUnix(startDate);
            const endTimestampUnix = dateToUnix(endDate);

            return { startTimestampUnix, endTimestampUnix }
        }
        const updateChartData = async () => {
            try {
                const {startTimestampUnix, endTimestampUnix} = getDateRange();
                const resolution = chartConfig[filter].resolution;
                const result = await getHistoricalData(stockSymbol, resolution, startTimestampUnix, endTimestampUnix);
                setData(formatData(result))
            } catch (error) {
                setData([]);
                console.log(error);
            }
        };

        updateChartData();
    }, [stockSymbol, filter])

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
            <AreaChart data={data}>
                <Area animationDuration={600} type='linear' dataKey='value' stroke='#ff667d' fillOpacity={1} strokeWidth={0.5} fill='url(#chartColor)'/>
                <Tooltip contentStyle={darkMode ? {backgroundColor: '#111827'} : null} itemStyle={darkMode ? {color: '#ff667d'} : null}/>
                {/* <XAxis dataKey='date' tickFormatter={filter == '1D' ? unixTime => moment(unixTime, 'MM/DD/YYYY').format('HH:mm') : null} interval={filter == '1W' ? 55 : "1D" ? 55 : null} stroke={darkMode ? '#dedede' : 'gray'} /> */}
                <XAxis dataKey='date' interval={filter == '1W' ? 55 : "1D" ? 100 : null} stroke={darkMode ? '#dedede' : 'gray'} />
                <YAxis domain={["dataMin", "dataMax"]} stroke={darkMode ? '#dedede' : 'gray'}/>
                <defs>
                    <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={darkMode ? '#ff667d': '#ff3856'} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={darkMode ? '#ff667d': '#ff3856'} stopOpacity={0}/>
                    </linearGradient>
                </defs>
            </AreaChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default Chart
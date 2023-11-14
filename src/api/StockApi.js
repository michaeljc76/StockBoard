const apiPath = 'https://finnhub.io/api/v1';

const respond = async (url) => {
    const response = await fetch(url);
    
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }

    return await response.json();
}

export const searchSymbols = async (query) => {
    const url = `${apiPath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

export const getStockDetails = async (stockSymbol) => {
    const url = `${apiPath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }

    return await response.json();
}

export const getStockQuote = async (stockSymbol) => {
    const url = `${apiPath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
    }

    return await response.json();
}

export const getHistoricalData = async (stockSymbol, resolution, from, to) => {
    const url = `${apiPath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
    }

    return await response.json();
}
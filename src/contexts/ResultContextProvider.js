import React, { createContext, useContext, useState } from "react";


const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1/'
  // url: 'https://google-search3.p.rapidapi.com/api/v1/search/q=elon+musk

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [searchTerm, setSearchTerm] = useState('Elon musk')
    const [isLoading, setIsLoading] = useState(false)

    const getResults = async (type) => {
        setIsLoading(true)

        const response = await fetch(type, {
            method: 'GET',
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.GOOGLE_SEARCH_API
            }
            
        })

        const data = await response.json()
        console.log(data)

        setResults(data)

        setIsLoading(false)
    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading}} >
            {children}
        </ResultContext.Provider>
    )

}

export const useResultContext = () => useContext(ResultContext)



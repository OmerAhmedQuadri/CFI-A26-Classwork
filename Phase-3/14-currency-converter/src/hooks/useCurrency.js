import { useState, useEffect } from "react";
import axios from 'axios'

async function fetchCurrencyData(API_URL) {
    try {
        return await axios.get(API_URL)
    } catch (error) {
        console.error('Error fetching currency data:', error)
    }
}

export const useCurrency =  (fromCurrency) => {
    const API_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`
    const [res, setRes] = useState({})
    // let res = {}
    useEffect( () => {
        fetchCurrencyData(API_URL)
            .then(response => {
                setRes(response.data[fromCurrency])
            })
            .catch(error => {
                console.log(error);
            })

    }, [fromCurrency])
    return res
};
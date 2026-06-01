import axios from 'axios'
import { question, questionInt } from 'readline-sync'

const API_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`

async function getOptions() {
    try {
        const response = await axios.get(`${API_URL}.json`)
        const data = response.data
        // console.log(data);
        const options = Object.keys(data)
        // console.log(options);
        return options
    } catch (error) {
        console.log(error);
    }
}
// await getOptions()

async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        const response = await axios.get(`${API_URL}/${fromCurrency}.json`)
        const data = response.data
        console.log(data);
        const rate = data[fromCurrency][toCurrency]
        // console.log(rate);
        // console.log(rate*amount);
        // const convertedAmount = amount * rate
        // console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`)
        return rate * amount
    } catch (error) {
        console.log(error);
    }
}
// await convertCurrency(100, 'inr', 'usd')

async function main() {
    try {        
        const options = await getOptions()
        options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`)
        })
        const fromIndex = questionInt('From: ')
        if(fromIndex < 1 || fromIndex > options.length) {
            console.log('Invalid option');
            return
        }
        const toIndex = questionInt('To: ')
        if(toIndex < 1 || toIndex > options.length) {
            console.log('Invalid option');
            return
        }
        const amount = questionInt('Amount: ')
        const fromCurrency = options[fromIndex - 1]
        const toCurrency = options[toIndex - 1]
        const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency)
        console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`)

    } catch (error) {
        console.log(error);
    }
}
main()
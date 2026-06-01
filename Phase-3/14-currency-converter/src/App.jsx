import { useState} from 'react'
import { useCurrency } from './hooks/useCurrency'

function App() {
  const [fromCurrency, setFromCurrency] = useState('usd')
  const [fromCurrencyValue, setFromCurrencyValue] = useState(0)
  const [toCurrency, setToCurrency] = useState('inr')
  const [toCurrencyValue, setToCurrencyValue] = useState(0)

  const currency = useCurrency(fromCurrency)
  const currencyOptions = Object.keys(currency)
  console.log(currencyOptions);
  const handleSubmit = () => {
    const rate = currency[toCurrency]
    setToCurrencyValue(fromCurrencyValue * rate)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className='flex flex-col items-center gap-8 border border-blue-300 bg-blue-200 rounded shadow p-8'>
        <div className='flex flex-row gap-4 items-center justify-between'>
          <label htmlFor="fromCurrency">From: </label>
          <input className='outline-0 border border-blue-300 p-3' type="number" id="fromCurrency" value={fromCurrencyValue} onChange={(e) => setFromCurrencyValue(e.target.value)} />
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {currencyOptions.map((option) => (
              <option key={option} value={option}>{option.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-row gap-4 items-center justify-between'>
          <label htmlFor="toCurrency">To: </label>
          <input readOnly className='outline-0 border border-blue-300 p-3'
           type="number" id="toCurrency" value={toCurrencyValue} onChange={(e) => setToCurrencyValue(e.target.value)} />
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {currencyOptions.map((option) => (
              <option key={option} value={option}>{option.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div>
          <button className='border border-blue-300 bg-red-300 px-4 cursor-pointer rounded' onClick={handleSubmit}>
            Convert
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
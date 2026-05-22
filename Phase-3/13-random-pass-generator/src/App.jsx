import { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"

const App = () => {
  const [passwordLength, setpasswordLength] = useState(8)
  const [uppercaseAllowed, setuppercaseAllowed] = useState(false)
  const [lowercaseAllowed, setlowercaseAllowed] = useState(true)
  const [numbersAllowed, setnumbersAllowed] = useState(false)
  const [symbolsAllowed, setsymbolsAllowed] = useState(false)
  const [password, setpassword] = useState('')
  const [copied, setcopied] = useState(false)

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
    setcopied(true)
    setTimeout(() => {
      setcopied(false)
    }, 2000)
  }


  const generatePassword = useCallback(() => {
      let str = ""
      if(lowercaseAllowed) str += "abcdefghijklmnopqrstuvwxyz"
      if(uppercaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      if(numbersAllowed) str += "01234567890123456789"
      if(symbolsAllowed) str += "!@#$%^&*()_+-=[]{}/?<>.\\|:;`~\"'"

      let pass = ""
      for(let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * str.length)
        pass += str[randomIndex]
      }
      setpassword(pass)
    },[passwordLength, uppercaseAllowed, lowercaseAllowed, numbersAllowed, symbolsAllowed])
  
  useEffect(() => {
    generatePassword()
  }, [passwordLength, uppercaseAllowed, lowercaseAllowed, numbersAllowed, symbolsAllowed, generatePassword])
  

  return (
    <div 
      className='flex flex-col justify-center text-white
          items-center h-screen bg-slate-500 gap-6'>
      <div className="flex flex-row border-2 border-black rounded-xl gap-8 p-4">
        <input 
          className="text-3xl outline-0 rounded p-2"
          readOnly value={password}
          type="text" />
          <button className={`${copied ? 'bg-green-500' : 'bg-slate-700'} w-30 font-bold px-6 
            rounded-lg text-white cursor-pointer`}
            onClick={copyPassword}>
            {copied ? "Copied!" : "Copy"}
          </button>
      </div>

      <div className="flex flex-col font-bold gap-6 text-xl">
        <div className="flex gap-4">
          <label htmlFor="pass-range">Password length: {passwordLength}</label>
          <input type="range" 
            min={4}
            max={50}
            value={passwordLength}
            onChange={(event) => setpasswordLength(event.target.value)}
            id="pass-range" className="w-80"/>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <input 
            className="cursor-pointer" onChange={() => setuppercaseAllowed((prev) => !prev)}
            value={uppercaseAllowed} type="checkbox" id="upper-case" />
          <label htmlFor="upper-case">Upper Case</label>
          {/* <input 
            className="cursor-pointer"
            type="checkbox" id="lower-case" />
          <label htmlFor="lower-case">Lower Case</label> */}
          <input 
            className="cursor-pointer" onChange={() => setnumbersAllowed(prev => !prev)}
            value={numbersAllowed} type="checkbox" id="numbers" />
          <label htmlFor="numbers">Numbers</label>
          <input 
            className="cursor-pointer" onChange={() => setsymbolsAllowed(prev => !prev)}
            value={symbolsAllowed} type="checkbox" id="symbols" />
          <label htmlFor="symbols">Symbols</label>
        </div>
      </div>
    </div>
  )
}

export default App
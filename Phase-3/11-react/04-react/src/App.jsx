import { useState } from 'react'

const App = () => {
  const [text, setText] = useState('')
  console.log(text);
  const onchangeHandler = (e) => {
    setText(e.target.value)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>  
      <input type="text" 
        className='border border-gray-700 p-4' 
        placeholder='Enter some text here..'
        value={text}
        onChange={onchangeHandler}
      />
      <div className='flex flex-row gap-4 my-6'>
        <button 
          className='bg-gray-600 p-2 text-white rounded'
          onClick={() => setText('')}
        >Clear</button>
        <button
          className='bg-black text-white p-2 rounded'
          onClick={() => alert(text)}
        >Submit</button>
      </div>
    </div>
  )
}

export default App
import React from 'react'
import Button from './components/Button'

const App = () => {
  return (
    <div className='flex flex-row items-center justify-center h-screen bg-black gap-4'>
      <Button color="primary" text="Buy now" 
        disabled={false} size="large"
        onClick={() => console.log('clicked')} 
      />
      <Button color="secondary" text="Cancel" 
        disabled={true} size="large"
        onClick={() => console.log('clicked')} 
      />
    </div>
  )
}

export default App
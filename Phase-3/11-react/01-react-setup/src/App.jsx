import React from 'react'
import Card from './components/Card'

const App = () => {
  const products = [
    {
      name: 'Book',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: '2.99'
    },
    {
      name: 'Bottle',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: '64.99'
    },
    {
      name: 'Pen',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: '59.99'
    },
    {
      name: 'Stand',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: '14.99'
    }
  ]
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }}>
      
      {
        products.map(prod => (
            <Card name={prod.name} description={prod.description} price={prod.price} />
          ))
      }
    </div >
  )
}
export default App
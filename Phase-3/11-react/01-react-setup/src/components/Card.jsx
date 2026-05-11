import React from 'react'

const Card = ({name = 'default', description = 'default', price = '0.00'}) => {
  return (
    <div style={{
        backgroundColor: 'black',
        border: 'none',
        borderRadius: '3px',
        color: 'white',
        padding: '10px 20px',
        margin: '10px',
        width: '300px'
      }}>
        <h1>{name}</h1>
        <p>{description}</p>
        <small>${price}</small>
      </div>
  )
}

export default Card
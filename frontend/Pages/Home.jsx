import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      Home
      <div className='gap-3 border-2 border-black'>
      <Link to='/payForm'>pay</Link>
      </div>
    </div>
  )
}

export default Home

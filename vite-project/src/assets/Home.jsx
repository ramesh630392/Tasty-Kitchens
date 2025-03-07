import React from 'react'
import { Navbar } from './Navbar'
import { DotLoader, Loader, RingLoader } from './Loader'
import { Restaurants } from './Restaurants'

export const Home = () => {
  return (
    <div className=''>
        <Navbar/>
        <Restaurants/>
    </div>
  )
}

import React from 'react'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
    const navigate = useNavigate();
    
  return (
    <section className='h-[100vh]' >
        <Navbar/>
        <div className='text-center' >
            <img src ="https://res.cloudinary.com/dk3wpzwpc/image/upload/v1713271804/Group_o4wjxq.jpg"  className='h-50 mx-auto mt-[8%]' alt = 'not-found' />
            <p className='text-[#1E293B] font-[700] text-xl' >Page Not Found</p>
            <p className='text-[#1E293B] font-[400] text-md' >We are sorry, the page you requested is not found</p>
            <p className='text-[#1E293B] font-[400] text-md' >Please go back to home page</p>
            <button className='bg-[#F7931E] rounded px-2 text-[#FFFF] mt-3' onClick={()=>{navigate('/')}} type='button' >Go To Home</button>
        </div>
    </section>
  )
}

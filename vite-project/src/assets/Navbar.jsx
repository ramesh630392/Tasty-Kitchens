import React, { useState } from 'react'
import { AppLogo } from '../Svg/AppLogo';
import gsap from 'gsap'
import {useGSAP} from '@gsap/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

export const Navbar = () => {
    const [ham, setHam] = useState(false);

    const navigate = useNavigate();
    
    useGSAP(()=>{
        gsap.to('.nav', {opacity:1, duration:1.5, y:0})
    },[ham]);


  return (
    <header className='gap-[20px]'>
       
        <nav  className='h-20 w-full bg-[#F8FAFC] flex space-between items-center ' >
        <div className='flex nav opacity-0 translate-y-5 ml-5 sm:ml-10' onClick={()=>{navigate('/')}} >
        <AppLogo/>
        <p className=' text-xl text-[#F7931E]  mt-1 ml-1 font-bold font-[DMsans] italic sm:text-2xl md:ml-7'>TastyKitchens</p>
        </div>
        <div className='hidden sm:flex gap-5 ml-auto mr-10 nav opacity-0 translate-y-5'>
            <p className='font-[700] text-xl text-[#F7931E]' onClick={()=>{navigate('/')}}>Home</p>
                <p className='font-[700] text-xl text-[#334155]' onClick={()=>{navigate('/cart')}}>Cart</p>
            <button className='text-[#FFFF] bg-[#F7931E] rounded pl-2 pr-5' onClick={()=>{Cookies.remove('jwtToken'),navigate('/login')}} >Logout</button>
        </div>
        <RxHamburgerMenu onClick={()=>{setHam(!ham)}} className='mr-5 opacity-0  translate-y-5  ml-auto text-3xl nav sm:hidden' />
        </nav>
        <>{ ham ? (<div className='flex gap-5 ml-auto items-center space-between h-20 w-full bg-[#F8FAFC] m-auto sm:hidden'>
            <p className='font-[700] text-xl text-[#F7931E] m-auto' onClick={()=>{navigate('/')}}>Home</p>
            <p className='font-[700] text-xl text-[#334155] m-auto' onClick={()=>{navigate('/cart')}}>Cart</p>
            <button className='text-[#FFFF] bg-[#F7931E] rounded pl-2 pr-5 m-auto' onClick={()=>{Cookies.remove('jwtToken'),navigate('/login')}} >Logout</button>
        </div>): <></>}</>
    </header>
  )
}

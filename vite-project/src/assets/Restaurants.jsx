import React, { useEffect, useState } from 'react'
import { Offers } from './Offers'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { RingLoader } from './Loader';
import { IoFilterOutline } from "react-icons/io5";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CiStar } from "react-icons/ci";
import { FaAnglesRight,  FaAnglesLeft } from "react-icons/fa6";
import { Footer } from './Footer';

export const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [offSet, setoffSet] = useState(1);
    const [filter, setFilter] = useState('Highest');
    const [loading, setLOading] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const navigate = useNavigate();
    useEffect(()=>{getData();},[]);

    const getData = async() =>{
        const jwt = Cookies.get('jwtToken');
        if (jwt === undefined){
            navigate('/login')
        }
        try{
            const response = await fetch(`https://apis.ccbp.in/restaurants-list?offset=${offSet}&limit=${9}&sort_by_rating=${filter}`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${jwt}`
                }
            })
            if (response.ok){
                const data = await response.json()
                //console.log(data)
                setRestaurants(data.restaurants)
                setLOading(false)
            }
        }catch(err){
            console.log(err);
        }
    }


    

   const nextPage = () =>{
    if (activePage<6){
        setActivePage(activePage+1);
        setoffSet((activePage-1) * 9);
        getData();
    };
   }

   const previousPage = () =>{
    if (activePage > 1 ){
        setActivePage(activePage - 1);
        setoffSet((activePage-2)  * 9);
        getData();
    }
   }

  return (
    <div className='gap-10 md: gap-30'>
        <Offers/>
        <>{loading ? <></>:<div className='min-h-[90vh] w-[90%] mt-5 ml-auto mr-auto rounded border-0'>
            <p className='text-xl text-[#183B56]  m-0 font-bold font-[DMsans] sm:text-2xl xl:text-3xl' >Popular Restaurants</p>
            <div className='flex-col mt-1 md:mt-0 md:flex md:flex-row'>
                <p className='text-[12px] text-[#183B56] sm:text-[15px]'>Select your favourite restaurant special dish and make your day happy</p>
                <div className='ml-auto flex mr-5 sm:ml-auto sm:mt-[-5px] sm:gap-2 sm:mt-2'>
                    <IoFilterOutline className='text-xl p-0 m-0 text-[#183B56] sm:text-2xl sm:mt-1'/>
                    <label htmlFor='filter' className='text-[15px] m-0 p-0 text-[#183B56] md:mt-1 md:font-[400]'>Sort by</label>
                    <select id ='filter' onChange={(e)=>{setFilter(e.target.value), getData()}} className='border-0 text-[#183B56]' >
                        <option value = "Highest"  >Highest</option>
                        <option value='Lowest'>Lowest</option>
                    </select>
                </div>
            </div>
            <hr className='text-[#183B56] w-[100%] mt-2 mb-3 mx-auto' />
            <div className='grid gap-2 h-[100%] mt-2 w-[100%] border-0 border-blue-500 grid-cols-1 md:grid-cols-2  lg:grid-cols-3' >
                {restaurants.map((eachItem, index)=>(<div key ={index} onClick={()=>{navigate(`restaurant/${eachItem.id}`)}} className='h-25 w-70 gap-2 border-0 border-red-500 flex sm:h-35 sm:w-80 sm:space-between' >
                     <img src={eachItem.image_url} className='h-24 w-40 rounded sm:h-29 w-40' alt ={`restaurant-image ${index}`} />
                     <div className='text-left h-20  w-30 border-0 flex-col my-auto sm:w-50'>
                        <p className='text-xs my-1 text-[#183B56] font-[500] sm:text-[15px]'>{eachItem.name}</p>
                        <p className='text-[10px] text-[#183B56] sm:text-md'>{eachItem.cuisine}</p>
                        <div className='flex my-1'>
                            <CiStar className='text-yellow-500 text-xl'/>
                            <p className='text-sm font-[600] text-black-500' >{eachItem.user_rating.rating}</p>
                            <p className='text-xs ml-1 mt-1 text-[#183B56]'>({eachItem.user_rating.total_reviews} ratings)</p>
                        </div>
                     </div>
                </div>))}
            </div>
            <div className='h-8 w-[100%] border-0 flex justify-center items-center' >
                <button className='mr-2' onClick={previousPage} ><FaAnglesLeft/></button>
                <p className='mt-[-3px]'>{activePage} of 6</p>
                <button className='ml-2' onClick={nextPage}><FaAnglesRight/></button>
            </div>
        </div> }</>
        <Footer/>
    </div>
  )
}

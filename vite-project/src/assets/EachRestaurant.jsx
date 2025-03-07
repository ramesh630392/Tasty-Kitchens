import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from './Navbar';
import { RingLoader } from './Loader';
import { CartContext } from './CartContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { CiStar } from "react-icons/ci";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { Footer } from './Footer';

export const EachRestaurant = () => {

    const [data, setData]  = useState({});
    const [loading, isLoading] = useState(true);
    const [items, setItems] = useState([]);
    const {id} = useParams();
    const {cart, addItem, increaseQuantity, decreaseQuantity, zeroCart} = useContext(CartContext);
    const navigate = useNavigate();
    useEffect(()=>{getData()},[]);

    const findItem = id =>{
        const oldCount = cart.filter(eachItem =>eachItem.id === id);
        if (oldCount.length >0){
            return oldCount[0].count
        }
        return 0;
    }

    const getData = async() =>{
        const jwt = Cookies.get('jwtToken');
        if (jwt === undefined)navigate('/login');
        try{
            const response = await fetch(`https://apis.ccbp.in/restaurants-list/${id}`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${jwt}`
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data)
                const details = {name: data.name, costForTwo: data.cost_for_two, imageUrl:data.image_url, cuisine: data.cuisine, location: data.location, rating: data.rating, reviews: data.reviews_count}
                setData(details);
                setItems(data.food_items.map(item =>({...item, count: findItem(item.id) })))
                isLoading(false);
            }
        }catch(err){
            console.log(err)
        }
    };

    const onAddItem = item =>{
        addItem({...item, count:item.count+1});
        setItems(items.map(eachItem=>eachItem.id === item.id?{...eachItem, count:eachItem.count+1}: eachItem));
    };

    const onIncreaseQuantity = id =>{
        increaseQuantity(id);
        setItems(items.map(eachItem=>eachItem.id === id?{...eachItem, count:eachItem.count+1}: eachItem));
    }

    const onDecreaseQuantity = id =>{
        decreaseQuantity(id);
        setItems(items.map(eachItem=>eachItem.id === id?{...eachItem, count:eachItem.count-1}: eachItem));
    }
    
    


  return (
    <section className='flex-col gap-5' >
        <Navbar/>
        {loading?  <div className='flex items-center justify-center h-[70vh] w-[100vw]'> <RingLoader/> </div> :<> <div className='flex bg-cover h-[28vh] mt-10 bg-cover bg-[url(https://res.cloudinary.com/dk3wpzwpc/image/upload/v1709312312/Frame_279_c8gcmm.png)] w-[100vw] md:h-[35vh]' >
            <div className='flex gap-2 h-[80%] w-[90%] my-auto mx-5 sm:h-[80%]'>
                <img src = {data.imageUrl} className=' w-[45%] h-[90%] rounded sm:h-[100%] sm:w-[35%]' alt = 'restaurant-image' />
                <div className='gap-2 h-[100%] w-[100%] my-auto mx-5 border-red-500 flex-col'>
                    <p className='text-[#E2E8F0] text-md sm:text-xl md:mt-2 xl:text-2xl'>{data.name}</p>
                    <p className='text-[#E2E8F0] font-[500] text-[9px] sm:text-sm md:mt-2 xl:text-md '>{data.cuisine}</p>
                    <p className='text-[#E2E8F0] text-[9px] sm:text-sm md:mt-2 xl:text-md'>{data.location}</p>
                    <div className='flex mt-1 items-center items-center md:mt-2' >
                        <div>
                            
                            <p className='text-[#E2E8F0] text-[8px] flex sm:text-sm xl:text-md'> <CiStar className='text-[#FFFF] text-md mt-0.7 '/> {data.rating}</p>
                            <p className='text-[#E2E8F0] text-[8px] sm:text-sm xl:text-md' >{data.reviews}+ Ratings</p>
                        </div>
                        <div className='ml-1'>
                            <p className='text-[#E2E8F0] text-[10px] mb-0  sm:text-sm xl:text-md ' >|</p>
                            <p className='text-[#E2E8F0] text-[10px] mt-0 sm:text-sm xl:text-md'>|</p>
                        </div>
                        <div>
                            <p className='text-[#E2E8F0] text-[8px] flex sm:text-sm xl:text-md  ml-1'><FaIndianRupeeSign className='mt-0.7' />{data.costForTwo}</p>
                            <p className='text-[#E2E8F0] text-[8px] sm:text-sm xl:text-md ml-1'>Cost for two</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 w-[80vw]  mx-auto mt-5" >
            {items.map(item =>(<div className='flex gap-2 rounded' key={item.id} >
                    <div className="w-[50%]  h-30">
                        <img src = {item.image_url} className='h-[100%] w-[100%] rounded ' alt = 'food-item' />
                    </div>
                    <div className="w-[48%]  h-30 flex-col justify-center items-center my-auto">
                        <p className='text-md text-[#334155] mt-2' >{item.name}</p>
                        <div className="flex">
                            <FaIndianRupeeSign className='text-[#334155] mt-2 text-sm ' />
                            <p className='text-[#334155] mt-1 text-sm'>{item.cost}</p>
                        </div>

                        <div className="flex">
                            <CiStar className='text-yellow-700 mt-1'/>
                            <p>{(item.rating.toString.length) === 3 ? item.rating : `${item.rating}` }</p>
                        </div>
                        <div>
                            {item.count === 0 ? <button type='button' onClick={()=>{onAddItem(item)}} className='text-yellow-500 text-xs pl-2 pr-2 rounded border-yellow-500 border-2'>ADD</button>: <div className="flex h-10  w-40">
                                <CiSquareMinus onClick={()=>{onDecreaseQuantity(item.id)}} className='mt-1 mr-2 text-xl'/>
                                <p>{item.count}</p>
                               <CiSquarePlus onClick={()=>{onIncreaseQuantity(item.id)}} className='mt-1 ml-2 text-xl'/>
                            </div> }
                        </div>
                    </div>
            </div>))}
        </div>
        <Footer/>
        </>}
    </section>
  )
}

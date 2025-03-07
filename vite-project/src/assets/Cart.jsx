import React, { useState, useContext } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { CartContext } from './CartContext';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


export const Cart = () => {
    const [payment, setPayment] = useState(false);
    const { cart, addItem, increaseQuantity, decreaseQuantity, zeroCart } = useContext(CartContext);
    const navigate = useNavigate();
    let cartValue = 0;
    for (let i of cart){
        cartValue+= (i.cost * i.count)
    }

    const onIncreaseQuantity = id =>{
        increaseQuantity(id);
    };

    const onDecreaseQuantity = id =>{
        decreaseQuantity(id);
    };

    

    const ItemsCart = () =>(
        <section className='min-h-[80vh]' >
            <div className='w-[70vw] h-[70vh] bg-blue-100 rounded mx-auto mt-2 h-auto translate-y-10'>
                <div className=' hidden  mx-auto w-[90%] sm:flex sm:block   ' >
                    <div className="w-[40%]">
                    <p className='mx-auto w-[30%] mx-auto '>Item</p>
                    </div>
                    <div className="w-[30%]">
                    <p className='mx-auto w-[35%]'>Quantity</p>
                    </div>

                    <div className="w-[30%]">
                    <p className='mx-auto w-[35%]'>Price</p>
                    </div>
                </div>

                {cart.map(item =>(<div className=" mx-1  mt-2 h-20 w-[90%] mx-auto flex sm:h-20  mx-auto" key={item.id} >
                        <div className="h-[100%] w-[50%] sm:w-[15%] ">
                            <img src={item.image_url} className='h-[100%] w-[100%] rounded' alt='item' />
                        </div>
                        <div className=" w-[100%] ml-2  sm:flex my-auto">
                            <div className=" w-[100%]  sm:w-[33%] my-auto">
                                <p className=' flex whitespace-nowrap sm:my-auto font-[DMSans] text-[#183B56]'>{item.name}</p>
                            </div>
                            <div className="w-[100%] sm:w-[33%] my-auto flex">
                                <CiSquareMinus onClick={()=>{onDecreaseQuantity(item.id)}} className='mt-1 mr-2 text-xl sm:ml-[27%]' />
                                <p className='font-[DMSans]  text-[#183B56]'>{item.count}</p>
                                <CiSquarePlus onClick={()=>{onIncreaseQuantity(item.id)}} className='mt-1 ml-2 text-xl'/>
                            </div>
                            <div className=" w-[100%]  sm:w-[30%] my-auto ">
                                <p className=' flex sm:ml-[35%] text-[#FFA412] font-[DMSans] '><FaIndianRupeeSign className='mt-1.5 text-sm' /> {item.cost}</p>
                            </div>
                        </div>
                    </div>))}
            <hr className='w-[95%] ml-auto font-bolder  text-[#CBD2D9] mt-5  text-2' />
                    <div className='w-[95%]  h-10 ml-auto mt-3 flex' >
                        <p className='text-[#3E4C59] font-[DMSans] text-xl'>Order Total:</p>
                        <p className='text-[#3E4C59] flex font-[DMSans] ml-auto mr-5 sm:ml-[65%] text-md '><FaIndianRupeeSign className='mt-1' />{cartValue}</p>
                    </div>
                    <div className='w-[95%] ml-auto mb-2 mt-2'>
                    <button type='button' onClick={()=>{setPayment(true)}} className='bg-[#FFA412] text-[#FFFF] font-[DMSans] rounded px-2 mx-[73%] flex mr-5 mb-5' >Place Order</button>
                    </div>
            </div>
        </section>
    );

    const PaymentDoneSection = () =>(
        <section className='h-[90vh] w-[100vw]  flex-col text-center justify-center items-center' >
            <div className='flex justify-center mt-[10%] tick'>
                <svg width="80" height="80" viewBox="0 0 80 80"  fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"  d="M39.9998 72.001C57.673 72.001 71.9998 57.6742 71.9998 40.001C71.9998 22.3279 57.673 8.00098 39.9998 8.00098C22.3266 8.00098 7.99976 22.3279 7.99976 40.001C7.99976 57.6742 22.3266 72.001 39.9998 72.001ZM54.8282 34.8294C56.3902 33.2673 56.3902 30.7347 54.8282 29.1725C53.2662 27.6105 50.7334 27.6105 49.1714 29.1725L35.9998 42.3442L30.8282 37.1725C29.2661 35.6105 26.7334 35.6105 25.1713 37.1725C23.6092 38.7347 23.6092 41.2674 25.1713 42.8294L33.1713 50.8294C34.7334 52.3914 37.2661 52.3914 38.8282 50.8294L54.8282 34.8294Z" fill="#22C55E"/>
                </svg>
            </div>
            <p className='payment-text text-[#1E293B] text-xl font-bolder'>Payment successful</p>
            <p className='payment-text text-[#1E293B] text-md mt-3'>Thank you for ordering</p>
            <p className='payment-text text-[#1E293B] text-md mb-2 mt-3'>Your payment is successfully completed</p>
            <button className='button-to-home bg-[#F7931E] rounded px-2 text-[#FFFF]' onClick={()=>{navigate('/'), zeroCart()}} id = 'order-placed-button_home' type='button' >Go To Home Page</button>
        </section>
    )

    const CartZero = () =>(
        <section className='h-[90vh] w-[100vw]  flex-col text-center justify-center items-center'>
            <img src ="https://res.cloudinary.com/dk3wpzwpc/image/upload/v1713241758/cooking_1_yrhdaf.jpg" className='mx-auto' alt ='food'/>
            <p className='text-[#1E293B] font-bolder text-xl mt-2' >No Orders Yet</p>
            <p className='text-[#1E293B] font-bolder text-md mt-2'>Your cart is empty. Add something from the menu</p>
            <button className='text-[#FFFF] rounded px-2 mt-3 bg-[#F7931E] font-bolder text-md' onClick={()=>{navigate('/')}} type='button' >Order Now</button>
        </section>
    )


  return (
    <div>
        <Navbar/>
        {cart.length === 0 ? <CartZero/> :(!payment ? <ItemsCart/>: <PaymentDoneSection/>)}
        <Footer/>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Loader, RingLoader } from './Loader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export const Offers = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async() =>{
        const jwt = Cookies.get('jwtToken')
        try{
            const response = await fetch('https://apis.ccbp.in/restaurants-list/offers', {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${jwt}`
                }
            });
            if (response.ok){
                const data = await response.json();
                setDeals(data.offers);
                setLoading(false);
            }
        }catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        getData();
    },[])

    const AutoPlaySlider = () => {
        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true, // Enables auto-play
          autoplaySpeed: 2000, // Adjust speed in milliseconds (2 seconds)
          arrows: false, // Hide arrows if needed
        };
        return (
          <div className="w-[100%] mx-auto">
            <Slider {...settings}>
              {deals.map((img, index)=><img src={img.image_url} key={index} alt ='slide' className='h-[15vh] w-screen rounded sm: h-[20vh] md:h-[40vh]' />)}
            </Slider>
          </div>
        );
    };
      

  return (
    <div className='h-[15vh] w-[90%]  mt-5 ml-auto mr-auto rounded sm: h-[20vh] md:h-[40vh]'>
        {loading? <RingLoader/> : <AutoPlaySlider/>}
    </div>
  )
}

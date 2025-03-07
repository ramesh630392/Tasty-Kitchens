import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const DotLoader = () => {
  
    useEffect(()=>{
        gsap.to('.loader', {y:0, duration:0.0001, opacity:0.5, stagger:0.001, repeat:-1, yoyo:true, ease: 'power1.in'})
    },[])

  return (
    <div className="flex h-[50vh] w-[50vw] items-center justify-center gap-2">
            <div className='rounded-full h-5 w-5 bg-red-500 translate-y-2 loader'></div>
            <div className='rounded-full h-5 w-5 bg-orange-500 translate-y-2 loader'></div>
            <div className='rounded-full h-5 w-5 bg-green-500 translate-y-2 loader'></div>
        </div>
    
  )
}

export const RingLoader = () =>{
    useEffect(()=>{
        gsap.to('.ring', {rotation: 360, repeat:-1, duration:0.5})
    },[]);
    return(
        <div className='flex justify-center items-center h-[100%] w-[100%]' >
            <div className='h-10 w-10 border-2  rounded-full border-t-red-500 border-b-blue-500 border-l-green-500 border-r-transparent ring' ></div>
        </div> 
    )
}

export const Loader = () => {
    const loaderRef = useRef(null);
  
    useEffect(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        scale: 1.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "bounce",
      });
    }, []);
  
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <div
          ref={loaderRef}
          className="w-16 h-16 bg-blue-500 rounded-full"
        ></div>
      </div>
    );
};
  
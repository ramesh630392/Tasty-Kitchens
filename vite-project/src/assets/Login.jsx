import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { AppLogo } from '../Svg/AppLogo'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'



export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');



    const navigate = useNavigate();
    useEffect(()=>{
        const jwtToken = Cookies.get('jwtToken');
        if (jwtToken !== undefined){
            navigate('/')
        }
    }, [])

    useGSAP(()=>{
        gsap.from('.log', {opacity:0, y:10, stagger:0.1, duration:0.3, ease: 'power1.in'})
    }, []);

    const onSubmit  = async(event) =>{
        event.preventDefault();
        if (username && password){
            const options ={
                method: "POST",
                body: JSON.stringify({username, password})
            }
            try{
                const response = await fetch('https://apis.ccbp.in/login', options);
                if (response.ok){
                    const data = await response.json();
                    Cookies.set('jwtToken', data.jwt_token);
                    navigate('/')
                }
            }catch(err){
                console.log(err)
            }
        }
    }

  return (
    <div className="flex-col h-[90vh] md:h-[90vh] w-[100vw]  border-red m-2 flex flex-row">

        <div className='h-[90vh] w-[100%] md:h-screen w-[50%] border-red-500 flex items-center content-center'>
            <div className='flex-col flex items-center content-center bg-[#FFFF] rounded h-[50%] w-[40%]  ml-auto mr-auto'>
                <div className='mt-5 log'>
                    <AppLogo />
                </div>
                <p className=' text-2xl text-[#F7931E]  font-bold font-[DMsans] italic sm:text-3xl m-0 p-0 text-center log'>TastyKitchens</p>
                <p className='text-[#0F172A] font-[500] text-[32px] font-[DMsans] log'>Login</p>
                <form onSubmit={onSubmit} className=' ml-3'>
                    <label className='text-left font-[400] text-sm log' htmlFor='username' >Username</label>
                    <input type='text' onChange={e=>{setUsername(e.target.value)}}  onBlur={e=>{e.target.value ===''? setUsernameErr('Required'):setUsernameErr('')}} id = 'username' placeholder='username...' className='w-[40vw] border-1 rounded md: w-[100%] log' />
                    <p className='text-red-500 text-xs h-5' >{usernameErr}</p>

                    <label className='text-left font-[400] text-sm log' htmlFor='password' >Password</label>
                    <input type='password' onChange={e=>{setPassword(e.target.value)}} onBlur={e=>{e.target.value ===''? setPasswordErr('Required'):setPasswordErr('')}} id = 'Password' placeholder='password...' className='w-[40vw] border-1 rounded md: w-[100%] log ' />
                    <p className='text-red-500 text-xs h-5 log' >{passwordErr}</p>
                    <button className='rounded text-[#FFFF] bg-[#F7931E] w-[90%] log' onSubmit={onSubmit} >Submit</button>
                </form>
            </div>
        </div>

        <div className='hidden md:h-screen block w-[50vh] border-red-500 border-2 '>
                <img className='rounded-full h-[50vh] w-[50vh] md: rounded-none h-[100%] w-[100%]'   src ="https://s3-alpha-sig.figma.com/img/ceff/20e8/367d1981f2a409a617ac848670d29c7e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=E4Rth4LZCNpJw~UQMC5fihcMtxSqoZu8dELza6bNazHjUBYp-7SsowYzEbmWPslc7cdx-4QErMYxwxFx9~0EdGTtlYbYZNSFn~7--mX8mE1Cy4sLy1EFZ0PjWQowQ~xKpV0UHd5pXSCBp5ZE21a03RkTSG9U8O9VWTfWivMX2kmImhdF196e4B-a2pjPC7LoRB87Zb7eUjsCpAaGCL0-7KizeW3tmLyp2EFdfkLA0q-WlGHqIpOAQp5rALihxlAdGCTlGJUyA6ufwuj452LxPCe1NNcjd1dl3u0b9JRbElGuxoYjaR6RVxbTP7oeRxRJ~xzF8RQ7~V4AP8PRFaZrEA__" alt ='login-page-image' />
        </div>

    </div>
  )
}

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
    const [loginErr, setLoginErr] = useState('');



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
                if (response.status === 200){
                    const data = await response.json();
                    Cookies.set('jwtToken', data.jwt_token);
                    navigate('/')
                }else{
                    setLoginErr('Incorrect Username or Password');
                }
            }catch(err){
                console.log(err);
            }
        }
    }

  return (
    <div className='h-[100vh] w-[100vw]  sm:flex' >
        <div className="w-[100vw] h-[50vw]   sm:w-[50vw] sm:h-[100vh] sm:order-2 ">
                <img className='h-[80vw] w-[80vw] rounded-full mt-[-15%] ml-[30%] sm:ml-0 sm:mt-0  sm:h-[100vh] sm:w-[100%] sm:rounded-none' src='https://s3-alpha-sig.figma.com/img/ceff/20e8/367d1981f2a409a617ac848670d29c7e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=E4Rth4LZCNpJw~UQMC5fihcMtxSqoZu8dELza6bNazHjUBYp-7SsowYzEbmWPslc7cdx-4QErMYxwxFx9~0EdGTtlYbYZNSFn~7--mX8mE1Cy4sLy1EFZ0PjWQowQ~xKpV0UHd5pXSCBp5ZE21a03RkTSG9U8O9VWTfWivMX2kmImhdF196e4B-a2pjPC7LoRB87Zb7eUjsCpAaGCL0-7KizeW3tmLyp2EFdfkLA0q-WlGHqIpOAQp5rALihxlAdGCTlGJUyA6ufwuj452LxPCe1NNcjd1dl3u0b9JRbElGuxoYjaR6RVxbTP7oeRxRJ~xzF8RQ7~V4AP8PRFaZrEA__' alt='login-img'/>
        </div>
        <div className="w-[60vw] h-[50vh]   sm:h-[100vh] sm:w-[50vw] sm:order-1  sm:flex ">
            <div className='my-[18%] ml-5 sm:w-[25vw] sm:mx-auto sm:my-auto sm:text-center  h-80'>
                <div className="ml-0.5 flex w-[100%] sm:items-center sm:justify-center log">
                    <AppLogo/>
                </div>
                <p className='text-[DMSans] italic text-[#F7931E] text-md  font-[700] sm:text-2xl log'>Tasty Kitchens</p>
                <p className='text-[#0F172A] text-[DMSans] font-[600] italic text-md sm:text-xl log'>Login</p>
                <form onSubmit={onSubmit} className='text-left'>
                    <div className='flex-col'>
                        <label htmlFor='username' className='text-[#475569] text-sm log' >USERNAME</label>
                        <input type="text" id='username' className='w-[90%] rounded border-1 log' onChange={e=>{setUsername(e.target.value), setLoginErr('')}} onBlur={e=>{e.target.value ===''? setUsernameErr('Required'):setUsernameErr('')}} />
                        <p className='text-red-500 text-sm h-5 log'>{usernameErr}</p>
                    </div>
                    <div className='flex-col'>
                    <label htmlFor='password' className='text-[#475569] text-sm log' >USERNAME</label>
                    <input type="password" id='password' className='w-[90%] rounded border-1 log' onChange={e=>{setPassword(e.target.value), setLoginErr('')}} onBlur={e=>{e.target.value === ''? setPasswordErr('Required'): setPasswordErr('')}} />
                    <p className='text-red-500 text-sm h-5 log'>{passwordErr}</p>
                    </div>
                    <button type='submit' className='bg-[#F7931E] w-[90%] text-[#FFFF] px-2 rounded log' >Submit</button>
                    <p className='text-red-500 text-sm h-6 log'>{loginErr}</p>
                </form>
            </div>
            

        </div>
    </div>
  )
}

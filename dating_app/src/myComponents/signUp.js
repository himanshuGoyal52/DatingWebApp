import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import { setUserInfo } from '../localStorage';
import './my.css'

export default function SignUP(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const navigate = useNavigate();
  // useEffect(()=>{
  //   if(localStorage.getItem('user-info')){
  //     history.push('/add')
  //   }
  // },[])
  async function signup () {
    let user = {name,email,password};
    const data = await register(user);
    if(data.error){
      alert("Invalid email or password")
    }else{
      setUserInfo(data);
      navigate('/findPartner');
    }
  }
  
  return (
    <>
    <div className='center_card'>
        <div id="container">
            <h3>SIGN UP</h3>
            <input onChange={(e)=>setName(e.target.value)} className='sign_in_input' placeholder='Enter your Name' type="text" />
            <input onChange={(e)=>setEmail(e.target.value)} className='sign_in_input' placeholder='Enter your email' type="email" />
            <input onChange={(e)=>setPassword(e.target.value)} className='sign_in_input' placeholder='Enter your password' type="password" />
            <a onClick={signup} href='/#' className='btn'>Sign-Up</a>
        </div>
    </div>
    </>
  )
}

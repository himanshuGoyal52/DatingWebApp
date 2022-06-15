import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { setUserInfo } from '../localStorage';
import { signin } from '../api';
import './my.css'

export const Login =  () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  // useEffect(()=>{
  //   if(localStorage.getItem('user-info')){
  //     history.push('/add')
  //   }
  // },[])
  async function login () {
    let user = {email,password};
    const data = await signin(user);
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
            <h3>LOG IN</h3>
            <input onChange={(e)=>setEmail(e.target.value)} className='sign_in_input' placeholder='Enter your email' type="email" />
            <input onChange={(e)=>setPassword(e.target.value)} className='sign_in_input' placeholder='Enter your password' type="password" />
            <a onClick={login} href='/#' id="UserLogin" className='btn'>Login</a>
        </div>
    </div>
    </>
  )
}

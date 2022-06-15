import React from 'react'
import './my.css'
import {Link, useNavigate} from "react-router-dom";
import { getUserInfo , clearUser } from '../localStorage';


export default function Header() {
  const navigate = useNavigate();
  function logout(){
    clearUser();
    navigate('/');
    window.location.reload(false);

  }
  const {name} = getUserInfo();
  return (
    <div id="header">
      <Link to="/"><div id='left_part'>Dating Web App - By Himanshu Goyal</div></Link>
      <div id="rightPart">
        {name ? 
        <>
          <Link to="/profile" className='btn'>Profile</Link>
          <Link to="/signup" onClick={logout} className='btn'>Log-out</Link>
        </>:
        <> 
          <Link to="/login" className='btn'>Login</Link>
          <Link to="/signup" className='btn'>Sign-UP</Link>
        </>
        }

      </div>
    </div>
  )
}
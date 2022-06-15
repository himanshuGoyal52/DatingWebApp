import React from 'react'
import './my.css'
import {Link} from "react-router-dom";
import { getUserInfo } from '../localStorage';


export default function Home() {
  let {name} = getUserInfo();
  return (
    <>
    <div className='center_card'>
        <h2 >Want to find a partner ? </h2>
        <h3 >Then our dating app is the best</h3>

        { name ?
          <>
            <Link to="/findPartner" className='btn'>Find Your Partner</Link>
          </> :
          <>
            <p>Already a user ? </p><Link to="/login" className='btn'>Login</Link>
            <p>New user ? </p><Link to="/signup" className='btn'>Sign-UP</Link>
          </>
        }
        
    </div>
    </>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserInfo } from '../localStorage';
import { useState } from 'react';
import './my.css'
import { uploadImg } from '../api';

export default function Profile() {
  const navigate = useNavigate();
  const {name,superLikes} =  getUserInfo();
  useEffect(()=>{
      if(!name){
          navigate('/');
      }
  },[])
  // console.log(superLikes.length);

  // file upload
  const [file,setfile] = useState(null);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo',file);
    const data = await uploadImg(formData);
    if(data.error){
      console.log("error in uploading img");
    }else{
      alert("Image uploaded succesfully!!")
    }
  }
  
  /********************Socket.io***********************/
  
  return (
    <>
    <div className='center_card'>
        <div id="container">
            {name ? <h3>{name}</h3> : ''}
            <div className="circle">
                <img alt='your pic' className="profile-pic" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
            </div>
            <div className="p-image">
              <form onSubmit={onFormSubmit}>
                <input onChange={(e)=>setfile(e.target.files[0])} type="file"  name="uploadfile" id="img" style={{display:"inline"}} />
                <button type='submit'  className="btn" style={{cursor:"pointer",border:'none'}} >upload image</button>
              </form>
            </div> 
            <div style={{margin:"2rem 0"}}>
              <p style={{display:"inline" , fontSize:"2rem" }}>Super Likes : </p> 
              <span style={{ fontSize:"2rem", position:"relative" , top:"5px",color:"red"}} ><i className='bx bxs-happy-heart-eyes'></i></span>
              <p style={{margin:"0"}}>
                {superLikes.length!==0 ? <>{superLikes.map(ele=><span>{ele},</span>)}</>:'Zero Super-Likes'}
              </p>
            </div>
        </div>
    </div>
    </>
  )
}

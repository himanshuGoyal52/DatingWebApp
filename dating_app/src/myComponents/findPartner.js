import React, { useState } from 'react'
import "./my.css"
import {useNavigate} from 'react-router-dom'
import { getUserInfo, setUserInfo } from '../localStorage'
import user1 from "../users/user1.png"
// import user2 from "../users/user2.png"
// import user3 from "../users/user3.png"
// import user4 from "../users/user4.png"
// import user5 from "../users/user5.png"
// import user6 from "../users/user6.png"
// import user7 from "../users/user7.png"
// import user8 from "../users/user8.png"
// import user9 from "../users/user9.png"
// import user10 from "../users/user10.png"
// import user11 from "../users/user11.png"
// import user12 from "../users/user12.png"
import { useEffect } from 'react'
import { blockUser, getOnlyUser, getUsers } from '../api'
import {io} from 'socket.io-client'


export default  function FindPartner() {
    const navigate = useNavigate();
    const {name} =  getUserInfo();
    useEffect(()=>{
        if(!name){
            navigate('/');
        }
    },[])

    
    let [userss, setUserss] = useState([]);
      
    useEffect(() => {
        getU().then((data)=>setUserss(data));
    }, []);

    const getU = async () => {
        const {name,blockedUsers} = getUserInfo();
        return await getUsers({name,blockedUsers});
        // console.log(data);
        // setUserss(data);

    }

    // console.log(userss);
    let naem;
    
    const {likedUsers,_id,blockedUsers} = getUserInfo();
    /******************************************** */
    // let [blockUser,setBlockUser] = useState('');
    async function blockUserr(name){
        console.log("running this");
        console.log(name);
        const data = await blockUser({name,_id});
        if(data.error){
            console.log("errororo");
        }else{
            alert("blocked Sucessfully");
        }
        const userrInfo = await getOnlyUser(_id);
        // console.log(userrInfo);
        if(data.error){
            console.log("Invalid email or password")
        }else{
            console.log(userrInfo);
            setUserInfo(userrInfo);
            // navigate('/findPartner');
            window.location.reload(false);
          }
        // setUserInfo(userrInfo);
    }
    /****************************** socket ********************/
    // const socket = io('http://localhost:3300');
    // socket.on("connection");
  return (
    <div className="grid-container">
        {userss.map((ele,index) => <>
        {/* Starting User */}
        {/* {console.log(naem)} */}

        {blockedUsers.includes(ele.name) ? <>
            <div style={{backgroundColor:"black"}} className="grid-item">
            <img alt='user' src={user1}/>
            <div style={{color:"white"}}>{ele.name}</div>
        </div>
        </> :<>
            <div className="grid-item">
            <img alt='user' src={user1}/>
            <div>{ele.name}</div>
            <div>
                <i style={{color:"red" ,cursor:"pointer",margin:"0px 1rem"}} className='bx bxs-happy-heart-eyes'></i>
                {likedUsers.includes({naem}) ? <i style={{cursor:"pointer",margin:"0px 1rem"}} className='bx bxs-heart' ></i> : <i style={{cursor:"pointer",margin:"0px 1rem"}} className='bx bx-heart' ></i>}
                <i onClick={()=>{blockUserr(ele.name)}} style={{cursor:"pointer",margin:"0px 1rem"}} className='bx bx-block' ></i>
            </div>
        </div>

        </>}
        {/* Ending User */}
        </>)}
        
    </div>
  )
}

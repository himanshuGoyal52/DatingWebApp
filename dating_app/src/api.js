// import userRouter from "../../backend/UserRouter";

export const signin = async({email, password}) =>{
    const _data = {
        "email" : email,
        "password" : password
    }
    
    try{
        const response = await fetch("http://localhost:3300/api/user/signin",{
            method : 'POST',
            mode: 'cors',
            body: JSON.stringify(_data),
            headers :{
                "Content-Type": "application/json",
                
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
        
    }catch(err){
        
        return {error : err.message};
    }
        
};
/*==========================================================================*/
export const register = async({name , email, password}) =>{
    const _data = {
        "name" : name,
        "email" : email,
        "password" : password
    }
    
    try{
        const response = await fetch("http://localhost:3300/api/user/register",{
            method : 'POST',
            mode: 'cors',
            body: JSON.stringify(_data),
            headers :{
                "Content-Type": "application/json",
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
        
    }catch(err){
        
        return {error : err.message};
    }
        
};
/*============================================================================ */
export const getUsers = async({name,blockedUsers}) => {
    try{
        const response = await fetch("http://localhost:3300/api/user/getusers",{
            method : 'POST',
            mode: 'cors',
            body: JSON.stringify({"name":name,"blockedUsers":blockedUsers}),
            headers :{
                "Content-Type": "application/json",
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
    }catch(err){
        return {error : err.message};
    }
}
/*============================================================================ */
export const uploadImg = async(formData) => {
    try{
        const response = await fetch("http://localhost:3300/api/user/upload",{
            method : 'POST',
            mode: 'cors',
            body: formData,
            headers :{
                // "Content-Type": "multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
                Accept:"application/json"
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
    }catch(err){
        return {error : err.message};
    }
}
/*================================================================================*/
export const blockUser = async({name,_id}) =>{
    
    try{
        const response = await fetch("http://localhost:3300/api/user/blockuser",{
            method : 'PUt',
            mode: 'cors',
            body: JSON.stringify({"name":name,"_id":_id}),
            headers :{
                "Content-Type": "application/json",
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
        
    }catch(err){
        
        return {error : err.message};
    }
        
};
/*=========================================================================*/
export const getOnlyUser = async(_id) =>{
    
    try{
        const response = await fetch("http://localhost:3300/api/user/getonlyuser",{
            method : 'POST',
            mode: 'cors',
            body: JSON.stringify({"_id":_id}),
            headers :{
                "Content-Type": "application/json",
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
        
    }catch(err){
        
        return {error : err.message};
    }
        
};
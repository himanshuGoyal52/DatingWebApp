export const setUserInfo = ({
    _id = '',
    name = '',
    email = '',
    password = '',
    superLikes = [],
    image = '',
    blockedUsers = [],
    likedUsers = [],
    token = '',

})=>{
    localStorage.setItem('userInfo',
    JSON.stringify({
        _id,
        name,
        email,
        password,
        superLikes,
        image,
        likedUsers,
        blockedUsers,
        token,
    })
    );
};
export const clearUser = () =>{
    localStorage.removeItem('userInfo');
};
export const getUserInfo = () => {
    return localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo'))
    :{name:'', email : '',password : ''}
}

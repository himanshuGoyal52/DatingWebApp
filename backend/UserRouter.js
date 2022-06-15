import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from './UserModel.js'
import { generateToken } from './utils.js';
import multer from 'multer';
import httpServer from 'http';
import { Server } from 'socket.io';


const userRouter = express.Router();

userRouter.post('/signin' ,expressAsyncHandler( async (req,res)=>{
    const signinUser = await User.findOne({
        email : req.body.email,
        password : req.body.password,
    });
    if(!signinUser){
        res.status(401).send({
            message : "Invalid Email or Password",
        });
    }
    else{
        res.send({
            _id : signinUser._id,
            name : signinUser.name,
            email : signinUser.email,
            image : signinUser.image,
            superLikes : signinUser.superLikes,
            blockedUsers : signinUser.blockedUsers,
            likedUsers : signinUser.likedUsers,
            token : generateToken(signinUser),
        });
    }
})
);
userRouter.post('/register' ,expressAsyncHandler( async (req,res)=>{
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        superLikes : [],
        image : '',
        likedUsers : [],
        blockedUsers : [],
    });
    const createdUser = await user.save();
    if(!createdUser){
        res.status(401).send({
            message : "Invalid User Data",
        });
    }
    else{
        res.send({
            _id : createdUser._id,
            name : createdUser.name,
            email : createdUser.email,
            superLikes : createdUser.superLikes,
            image : createdUser.image,
            blockedUsers : createdUser.blockedUsers,
            likedUsers : createdUser.likedUsers,
            token : generateToken(createdUser),
        });
    }
})
);
/*=================================================================*/
userRouter.post('/getusers',expressAsyncHandler(async(req,res)=>{
    const users = await User.find({blockedUsers:{ $ne: req.body.name } , name : {$ne:req.body.name} });
    if(!users){
        res.status(404).send({
            message : "Users Not Found",
        });
    }else{
        res.send(users);
    }
}));
/*=========================================================================== */

const multerConfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'uploads/');

    },
    filename:(req,file,callback)=>{
        const ext = file.mimetype.split('/')[1];
        callback(null,`image-${Date.now()}.${ext}`);
    }
})
const isImage = (req,file,callback) => {
    if(file.mimetype.startsWith('image')){
        callback(null,true);
    }else{
        callback(new Error('Only image is allowed..'));
    }
}
const upload = multer({
    storage:multerConfig,
    fileFilter:isImage,
});
let uploadImage = upload.single('photo');
userRouter.post('/upload',uploadImage,(req,res)=>{
    // console.log(req.file);
    res.status(200).send({
        message:"img aa rahi hai"
    });
})

/*==================================================================================*/
userRouter.put('/blockuser',expressAsyncHandler(async(req,res)=>{
    const user = await User.findById(req.body._id);
    const blockedUsersArray = user.blockedUsers;
    blockedUsersArray.push(req.body.name);
    user.blockedUsers = blockedUsersArray;
    const updatedUser = await user.save();

    // console.log(req.body.name);
    if(user.blockedUsers.length === 0){
        res.status(404).send({
            message : "failur",
        });
    }else{
        res.send({
            message : "blocked successfully",
            updatedUser
        });
    }
}));
/*==================================================================================*/
userRouter.post('/getonlyuser',expressAsyncHandler(async(req,res)=>{
    const user = await User.findById(req.body._id);
    // console.log(req.body.name);
    if(!user){
        res.status(404).send({
            message : "failur",
        });
    }else{
        res.send(
            {
                _id : user._id,
                name : user.name,
                email : user.email,
                image : user.image,
                superLikes : user.superLikes,
                blockedUsers : user.blockedUsers,
                likedUsers : user.likedUsers,
                token : generateToken(user),
            }
        );
    }
}));


/********************* Socket.io ***********************/
// const io = new Server(httpServer, {
//     cors:{origin:'*'}
// });

// io.on('connection',(socket)=>{
//     console.log(socket.id);
// })

export default userRouter;
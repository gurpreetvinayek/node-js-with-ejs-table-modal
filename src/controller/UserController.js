const database = require('../../config/conn');
const User = require('../models/UserModel');
exports.commonFunction = async(req,res)=>{
    const user = await User.commonFunction2();
    console.log(user)
    try{
        return res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
}


exports.getAuthUserDta = async(req,res)=>{
    const data = await User.authUser(req.user.id);
    try{
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json('no data found');
    }
}

exports.FrontendRegister = async(req,res)=>{

        res.render('register');
   
}
exports.saveRegister = async(req,res)=>{
   //const data = await User.createUser(req.body);
   const newUser = {
    name: 'Test',
    email: req.body.email,
    password: req.body.pwd
};
   try{
       const userId = await User.saveRegister(newUser);
        newUser.id = userId;
    return res.status(200).json('user created successfully');
   }catch(err){
    return res.status(500).json(err.message);
   }
}

exports.users = async(req,res)=>{
    const data = await User.commonFunction2();
    res.render('users',{data:data})
}

exports.info = async(req,res)=>{
    const data = await User.authUser(req.params.id)
    return res.json(data);
}
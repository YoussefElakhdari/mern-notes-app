const User = require('../model/users');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET , {
        expiresIn: '3d'
    })
}

const register= async (req, res)=>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({success:false, error: 'Type the email or the password please!'})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({success:false, error: 'Type a valid email !'})
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({success:false, error: 'Type a strong password !'})
    }
    
    try{
        const exists = await User.findOne({ email });
        if(exists) return res.status(400).json({success:false, error: 'This user already exists'})

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        // const savedUser = await User.create({email, password:hashed}).save();
        const savedUser = await new User({email, password:hashed}).save();  

        const token = generateToken(savedUser._id);
        res.status(200).json({
            success: true,
            token
        })

    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

const login= async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({success:false, error: 'Type the email or the password please!'})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({success:false, error: 'Type a valid email !'})
    }

    try{
        const Userexists = await User.findOne({email})
        if(!Userexists){
            return res.status(200).json({
                success: false,
                error: 'invalid credentials'
            })
        };
        const isMatch = await bcrypt.compare(password, Userexists.password);
        if(!isMatch){
            return res.status(200).json({
                success: false,
                error: 'invalid credentials'
            })
        };

        const token = generateToken(Userexists._id);
        res.status(200).json({
            success: true,
            token
        })
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

module.exports = {register,login};

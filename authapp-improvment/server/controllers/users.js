const User = require('../models/users');
const JWT  = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config')
signToken = async function (user) {
    // console.log(JWT_SECRET);  
    return JWT.sign({
        iss : "authapp",
        sub : user.id,
        iat : new Date().getTime(),
        exp : new Date().setDate(new Date().getDate() + 1) 
    }, JWT_SECRET);
}


module.exports = {
    signUp : async (req, res, next) => {
        const { email, password } = req.value.body;
        
        let foundUser = await User.findOne({$or: [{'local.email': email}, {'facebook.email': email}, {'google.email': email}]});
        console.log("foundUser", foundUser);
        if(foundUser){
            // console.log("stop becauce alreadey")
            return res.status(403).json({
                msg : "user failed to create",
                error : "email alrready sign up"
            });
        }

        //if user already login it with other 3 party email system will refuse that email
        // //already sign up with google
        // foundUser = await User.findOne({"google.email" : email});
        // if(foundUser){
        //     foundUser.methods.push('local');
        //     foundUser.local = {
        //         email : email,
        //         password : password
        //     }
        //     await foundUser.save();
            
        //     const token = signToken(foundUser);
        //     return res.status(200).json({ 
        //         msg : "success link account to google",
        //         token : token })
        // }

        // foundUser = await User.findOne({"facebook.email" : email});
        // if(foundUser){
        //     foundUser.methods.push('local');
        //     foundUser.local = {
        //         email : email,
        //         password : password
        //     }
        //     await foundUser.save();
            
        //     const token = signToken(foundUser);
        //     console.log(token);
        //     return res.status(200).json({ 
        //         msg : "success link account to facebook",
        //         token : token })
        // }

        const user = new User({
            methods : ['local'],
            local : {
                email : email,
                password : password
            }
        });
        user.save().then( user =>{
            signToken(user).then((token)=>{
                res.status(200).json({
                    msg : "user created",
                    new_user : user,
                    token : token,
                })
            })
        })
        .catch(err=>{
            res.status(400).send("Sign up failed "+err);
        });
        // user.save();
    },
    
    signIn : async (req, res, next) => {
        //generate token
        console.log("SignIn");
        signToken(req.user).then((token)=>{
            res.status(200).json({
                msg : "Sign in successfull",
                token : token,

            })
        });
    },
    
    dashboard : async (req, res, next) => {
        res.json({
            resource : "resource",
            methods : req.user.methods
        })
    },
    
    googleOauth : async (req, res, next) => {
        signToken(req.user).then((token)=>{
            res.status(200).json({
                msg : "Sign in with google successfull",
                token : token,
            })
        });
    },

    facebookOauth : async (req, res, next) => {
        signToken(req.user).then((token)=>{
            res.status(200).json({
                msg : "Sign in with facebook successfull",
                token : token,
            })
        });
    },

    linkGoogle : async (req, res, next) => {
        res.status(200).json({
            success : true,
            msg     : "Successfully linked account with google"
        })
    },

    linkFacebook : async (req, res, next) => {
        res.status(200).json({
            success : true,
            msg     : "Successfully linked account with facebook"
        })
    }
};

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
        await user.save();
        const token = await signToken(user);
        // console.log("token", token);
        res.cookie('access_token', token, { httpOnly : true });
        res.status(200).json({
            msg : "user created",
            new_user : user,
        });
        // user.save();
    },
    
    signIn : async (req, res, next) => {
        //generate token
        console.log("SignIn");
        signToken(req.user).then((token)=>{
            res.cookie('access_token', token, { httpOnly : true });
            res.status(200).json({
                msg : "Sign in successfull",

            })
        });
    },

    signOut : async (req, res, next) => {
        //generate token
        console.log("SignIn");
        res.clearCookie('access_token');        
        res.status(200).json({
            success : true,
            msg : "Sign out successfull",
        })
    },
    
    dashboard : async (req, res, next) => {
        res.json({
            resource : "resource",
            methods : req.user.methods
        })
    },
    
    googleOauth : async (req, res, next) => {
        signToken(req.user).then((token)=>{
            res.cookie('access_token', token, { httpOnly : true });
            res.status(200).json({
                msg : "Sign in with google successfull",
            })
        });
    },

    facebookOauth : async (req, res, next) => {
        signToken(req.user).then((token)=>{
            res.cookie('access_token', token, { httpOnly : true });
            res.status(200).json({
                msg : "Sign in with facebook successfull",
            })
        });
    },

    linkGoogle : async (req, res, next) => {
        res.status(200).json({
            success : true,
            methods : req.user.methods,
            msg     : "Successfully linked account with google"
        })
    },

    unlinkGoogle : async (req, res, next) => {
        if(req.user.google){
            req.user.google = undefined;
        }
        const googleStriPos = req.user.methods.indexOf('google')
        if(googleStriPos >=0 ){
            req.user.methods.splice(req.user.methods.indexOf('google'), 1);
        }
        await req.user.save();
        res.status(200).json({
            success : true,
            methods : req.user.methods,
            msg     : "Successfully unlinked account with google"
        })
    },


    linkFacebook : async (req, res, next) => {
        res.status(200).json({
            success : true,
            methods : req.user.methods,
            msg     : "Successfully linked account with facebook"
        })
    },

    unlinkFacebook : async (req, res, next) => {
        if(req.user.facebook){
            req.user.facebook = undefined;
        }
        const facebookStriPos = req.user.methods.indexOf('facebook')
        if(facebookStriPos >=0 ){
            req.user.methods.splice(req.user.methods.indexOf('facebook'), 1);
        }
        await req.user.save();
        res.status(200).json({
            success : true,
            methods : req.user.methods,
            msg     : "Successfully unlinked account with facebook"
        })
    },

    checkAuth : async (req, res, next) => {
        res.json({
            resource : true,
        })
    },
};

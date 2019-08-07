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
        
        User.findOne({"local.email" : email}, function(err, user){
            if(user){
                res.status(403).json({
                    msg : "user failed to create",
                    error : "email alrready sign up"
                })
            }else{
                const user = new User({
                    method : 'local',
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
                            token : token
                        })
                    })
                })
                .catch(err=>{
                    res.status(400).send("Sign up failed "+err);
                });
                // user.save();
            }
        }).catch(err => {
            console.log(err);
        })
    },

    signIn : async (req, res, next) => {
        //generate token
        console.log("SignIn");
        signToken(req.user).then((token)=>{
            res.status(200).json({
                msg : "Sign in successfull",
                token : token
            })
        });
    },

    secret : async (req, res, next) => {
        res.json({
            resource : "resource"
        })
    },

    googleOauth : async (req, res, next) => {
        signToken(req.user).then((token)=>{
            res.status(200).json({
                msg : "Sign in with google successfull",
                token : token
            })
        });
    }
};

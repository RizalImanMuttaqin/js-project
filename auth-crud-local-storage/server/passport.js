const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const Extract = require('passport-jwt').ExtractJwt;
// const { JWT_SECRET } = require('./config/config');
const LocalStrategy = require('passport-local');
const User = require('./models/users');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const config =require('./config/config');
const FacebookTokenStrategy = require('passport-facebook-token');

//JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({ 
    jwtFromRequest : Extract.fromAuthHeaderAsBearerToken(),
    secretOrKey : config.JWT_SECRET,
    passReqToCallback : true
},
 async (req, payload, done) => {
    //find user in token
    try{
        User.findById(payload.sub, (err, user) => {
            if(!user){
                return done(null, false);
            }
            // console.log(payload.sub);
            req.user = user;
            done(null, user);
        })
    } catch(err){
        done(err, false);
    }
}));

//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField : 'email',
}, async (email, password, done) =>{
    User.findOne({"local.email" : email}, (err, user) =>{
        if(!user){
            return done(null, false);
        }
        user.isValidPassword(password).then((res)=>{
            if(!res){
                done(null, false);
            }
            done(null, user);            
        })
    })
} ))

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID : config.oauth.google.clientID,
    clientSecret : config.oauth.google.clientSecret,
    passReqToCallback : true,
}, async (req, accessToken, refreshToken, profile, done) => {

    
    //find some user where already sigup with same email with  google account
    try{
        // console.log("req.user", req.user);
        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);
        // console.log('profile', profile);

        //could get 2 function
        //1) registering
        //2) linking

        if(req.user){
            // already login, linking acoount
            let email = profile.emails[0].value;
            let foundUser = await User.findOne({$or: [{'facebook.email': email}, {'google.email': email}]});
            if(foundUser){
                // console.log("email sudah terhubung ke user lain");
                return done(null, "error");
                // return done("email sudah terhubung ke user lain")
            }else{
                req.user.methods.push('google');
                req.user.google ={
                    id : profile.id,
                    email : email,
                    name : profile.displayName
                }
                await req.user.save();
                return done(null, req.user);
            }
            
        }else{
            let existingUser = await User.findOne({"google.id": profile.id});
            if (existingUser){
                return done(null, existingUser)
            }
    
            //check if we have existing user with local login with same email
            existingUser = await User.findOne({"local.email" : profile.emails[0].value})
            if(existingUser){
                existingUser.methods.push('google');
                existingUser.google = {
                    id : profile.id,
                    email : profile.emails[0].value,
                    name : profile.displayName
                };
                existingUser = await existingUser.save();
                return done(null, existingUser);
            }
    
            const newUser = new User ({
                methods : ['google'],
                google : {
                    id : profile.id,
                    email : profile.emails[0].value,
                    name : profile.displayName
                }
            });
            await newUser.save();
            done(null, newUser);
        }

    }catch(err){
        done(err, false, err.message);
    }
}))


passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try{
        // console.log("req.user", req.user);
        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);
        // console.log('profile', profile);
        
        //could get 2 function
        //1) registering
        //2) linking
        
        if(req.user){
            // already login, linking acoount
            let email = profile.emails[0].value;
            let foundUser = await User.findOne({$or: [{'facebook.email': email}, {'google.email': email}]});
            if(foundUser){
                // console.log("email sudah terhubung ke user lain");
                return done(null, "error");
                // return done("email sudah terhubung ke user lain")
            }else{
                req.user.methods.push('facebook');
                req.user.facebook ={
                    id : profile.id,
                    email : profile.emails[0].value,
                    name : profile.displayName
                }
                await req.user.save();
                return done(null, req.user);
            }
        }else{
            // console.log(req.user);
            let existingUser = await User.findOne({"facebook.id": profile.id});
            if (existingUser){
                return done(null, existingUser)
            }
            
            //check if we have existing user with local login with same email
            existingUser = await User.findOne({"local.email" : profile.emails[0].value})
            if(existingUser){
                existingUser.methods.push('facebook');
                existingUser.facebook = {
                    id : profile.id,
                    email : profile.emails[0].value,
                    name : profile.displayName
                };
                existingUser = await existingUser.save();
                return done(null, existingUser);
            }
            
            const newUser = new User ({
                methods : ['facebook'],
                facebook : {
                    id : profile.id,
                    email : profile.emails[0].value,
                    name : profile.displayName
                }
            });
            await newUser.save();
            done(null, newUser);
        }
    }catch(err){
        done(err, false, err.message);
    }
}))


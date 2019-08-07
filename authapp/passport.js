const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./config/config');
const LocalStrategy = require('passport-local');
const User = require('./models/users');
const GooglePlusTokenStrategy = require('passport-google-plus-token');

//JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({ 
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : JWT_SECRET
},
 async (payload, done) => {
    //fing user in token
    try{
        const user = User.findById(payload.sub, (err, user) => {
            if(!user){
                return done(null, false);
            }
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
    console.log("iam here");
    User.findOne({email}, (err, user) =>{
        if(!user){
            return done(null, false);
        }
        console.log("iamstuck here");
        user.isValidPassword(password).then((res)=>{
            if(!res){
                done(null, false);
            }
            done(null, user);            
        })
    })
} ))

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID : "640481382013-9mmt4q5v3i6j0d0euognelr3hl581tps.apps.googleusercontent.com",
    clientSecret : "Su0VJoljxG5xIlqrV_DQoZ8N"
}, async (accessToken, refreshToken, profile, done) => {
    // console.log('accessToken', accessToken);
    // console.log('refreshToken', refreshToken);
    // console.log('profile', profile);

    User.findOne({"google.id" : profile.id}).then( (res) => {
        if(res){
            return done(null, res);
        }
        const user = new User({
            method : 'google',
            google:{
                id : profile.id,
                email : profile.emails[0].value,
                name : profile.displayName
            }
        });
        user.save().then( (res) => {
            done(null, user);
        });
    })
    .catch( (err) => {
        console.log(err);
    })
}))
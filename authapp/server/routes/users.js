const express = require('express');
const passportConf = require('../passport');
const router = require('express-promise-router')();
// const router   = express.Router;
const UsersController = require('../controllers/users');
const { validateBody, schema } = require('../helpers/validator');
const passport = require('passport');
const passportSignIn = passport.authenticate('local', {session:false});
const passportJWT = passport.authenticate('jwt', {session:false});
const passportGoogle = passport.authenticate('googleToken', {session:false});
const passportFacebook = passport.authenticate('facebookToken', {session:false});


router.post('/signup', validateBody(schema.authSchemaSignIn), UsersController.signUp)

router.post('/signin', validateBody(schema.authSchemaSignIn), passportSignIn, UsersController.signIn);

router.get('/secret', passportJWT, UsersController.secret);

router.post("/oauth/google", passportGoogle, UsersController.googleOauth)
router.post("/oauth/facebook", passportFacebook, UsersController.facebookOauth)

module.exports = router;

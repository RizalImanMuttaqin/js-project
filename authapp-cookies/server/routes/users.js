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

router.get('/signout', passportJWT, UsersController.signOut);

router.get('/secret', passportJWT, UsersController.dashboard);

router.post("/oauth/google", passportGoogle, UsersController.googleOauth);

router.post("/oauth/facebook", passportFacebook, UsersController.facebookOauth);

router.post("/oauth/link/google", passportJWT, passport.authorize('googleToken', { session:false }), UsersController.linkGoogle);

router.post("/oauth/unlink/google", passportJWT,  UsersController.unlinkGoogle);

router.post("/oauth/unlink/facebook", passportJWT,  UsersController.unlinkFacebook);

router.post("/oauth/link/facebook", passportJWT, passport.authorize('facebookToken', { session:false }), UsersController.linkFacebook);

router.get('/status', passportJWT, UsersController.checkAuth);

module.exports = router;

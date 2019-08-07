const express = require('express');
const passportConf = require('../passport');
const router = require('express-promise-router')();
// const router   = express.Router;
const UsersController = require('../controllers/users');
const { validateBody, schema } = require('../helpers/validator');
const passport = require('passport');
const passportSignIn = passport.authenticate('local', {session:false});
const passportJWT = passport.authenticate('jwt', {session:false});
router.post('/signup', validateBody(schema.authSchemaSignIn), UsersController.signUp)

router.post('/signin', validateBody(schema.authSchemaSignIn), passportSignIn, UsersController.signIn);

router.get('/secret', passportJWT, UsersController.secret);

router.post("/oauth/google", passport.authenticate('googleToken', {session:false}))

module.exports = router;

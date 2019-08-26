const path = require('path');
const gateway = require('express-gateway');

//==================================================

const PORT = process.env.PORT || 1234;
const express = require('express');
var app = express();
app.use(
    require('body-parser').urlencoded({
        extended:true
    })
);

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage.')
})

//==================================================

const passport = require('passport');

app.get('/success', (req, res) => {
    res.send(`Welcome ${req.query.username}`)
});

//==================================================

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password', session:false}, (username, password, done) => {
  return done(null, {id: 1, name:'johndoe', })
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/error', (req, res) => {
  res.send('asdasjds');
});

app.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/error',
}));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

gateway()
  .load(path.join(__dirname, 'config'))
  .run();
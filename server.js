require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/auth', (req, res) => {
    res.send('Authentication route');
  });

app.post('/import', (req, res) => {
    res.send('Data import route');
  });

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

// Configure session management
app.use(session({ secret: 'anything', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
    // In this function, you'd handle the user's profile
    // You could check if the user is in your database and create a user record if not
    // For now, we'll just return the profile
    return cb(null, profile);
}
));

// Serialize and deserialize user instances to and from the session.
passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(obj, done) {
done(null, obj);
});

//Create Authentication Routes:

// Redirect the user to Google for authentication.
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google will redirect the user back to your app after authentication.
// Handle the callback after Google has authenticated the user.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  

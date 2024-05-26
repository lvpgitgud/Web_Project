const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;


const GOOGLE_CLIENT_ID = '638320821933-dr6isngbk83fgskask6h1rihoi6nhrhu.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';
const FACEBOOK_APP_SECRET = 'YOUR_FACEBOOK_APP_SECRET';
const TWITTER_CONSUMER_KEY = 'YOUR_TWITTER_CONSUMER_KEY';
const TWITTER_CONSUMER_SECRET = 'YOUR_TWITTER_CONSUMER_SECRET';
const INSTAGRAM_CLIENT_ID = 'YOUR_INSTAGRAM_CLIENT_ID';
const INSTAGRAM_CLIENT_SECRET = 'YOUR_INSTAGRAM_CLIENT_SECRET';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    
    return done(null, profile);
}));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Save user profile to the database
    return done(null, profile);
}));

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Save user profile to the database
    return done(null, profile);
}));

passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: '/auth/instagram/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Save user profile to the database
    return done(null, profile);
}));

// Serialize and deserialize user instances to support login sessions
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

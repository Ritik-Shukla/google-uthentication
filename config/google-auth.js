const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID:"238411148406-nfuu76l3nkspdslv315f3jc840n5ufpm.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:5000/google/callback"
},function(accessToken,refreshToken,profile,cb){
    cb(null,profile);
}));

passport.serializeUser(function(user,cb){
cb(null,user)
});
passport.deserializeUser(function(user,cb){
    cb(null,user)
    });
module.exports = passport;
// require('dotenv').config();
const express = require('express');
const session  = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');
const app = express();



require('./config/google-auth');


app.use(express.static(path.join(path.resolve(),"public")));
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.urlencoded({extended:true}));


mongoose.connect('mongodb://localhost/NewDB',{useNewUrlParser:true});
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
type:String,
unique:true,
required:true
    },
    passpword:{
        type:String,
        required:true
    }
});
const User = mongoose.model('User',UserSchema);


app.use(session({
    secret:'Key',
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false
    }
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/profile',(req,res)=>{
    if(req.isAuthenticated()){
        console.log(req.user);
        res.render('profile',{user:req.user});
    }else{
        res.redirect('/');
    }
})
// to render email options
app.get('/auth/google',passport.authenticate('google',{scope: ["profile","email"]}));
app.get('/google/callback',passport.authenticate("google",{failureRedirect:'/'}),async (req,res)=>{
    res.redirect('/profile');
});
app.get('/signup',(req,res)=>{
    res.render('signup')
});
app.post('/signup',(req,res)=>{
    const { name, email, password, confirm_password } = req.body;
    console.log(req.body);
    User.create({
        name:name,
        email:email,
        password:password
    })
    res.redirect('/');
})
app.get("/logout", (req, res) => {
    req.logout(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  });
app.listen(5000);
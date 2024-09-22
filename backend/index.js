const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db');
const cors=require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const PORT = process.env.PORT || 8080;
const session=require('express-session');
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb=require("./Models/userSchema")

const OAuth2StrategyFacebook = require("passport-facebook").Strategy;
const OAuth2StrategyTwitter = require("passport-twitter").Strategy;
const OAuth2StrategyLinkedIn = require("passport-linkedin-oauth2").Strategy;
var GitHubStrategy = require('passport-github').Strategy;
const GITHUB_CLIENT_ID="Ov23liJrIX7ImmLV2yDE";
const GITHUB_CLIENT_SECRET="d622aba28a0138b0aa87d2313a560e7ff747b6f5";

    

const clientid="1007426022468-g6o4qh3q3oco0tkev4q6os859mljpvgn.apps.googleusercontent.com";
const clientsecret="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";

app.get('/ping',(req,res)=>{
    res.send("komal");
})

app.use(bodyParser.json());
app.use(cors({
    origin:"https://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

// Session
app.use(session({
    secret:"uhgeritjfjidje3446fhue5f7dfr4uwehw7hwefrh7ruwr74werfbdjb",
    resave:false,
    saveUninitialized:true
}))

//Setup Passport 
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        console.log("profile",profile)
        try{
            let user =await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        }catch(error){
            return done(error,null)
        }
    }
)
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

//initialise google 
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/home",
    failureRedirect:"http://localhost:3000/login"
}))

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
  async(accessToken, refreshToken, profile, cb) =>{
    const user =await userdb.findOne({
        accountId:profile.id,
        provider:"github",
    });
    if(!user){
        console.log("Adding new github user to DB..");
        const user = new userdb({
            accountId:profile.id,
            name:profile.username,
            provider:profile.provider,
        });

        await user.save();

        return cb(null,profile);
    }
    else{
        console.log("GitHub user already exists in DB..");
        return cb(null,profile);
    }
  }
));

app.get('/auth/github',passport.authenticate('github',{scope:["profile","email"]}));
   
app.get('/auth/github/callback',passport.authenticate("github", { 
    successRedirect:"http://localhost:3000/home",
    failureRedirect: "http://localhost:3000/login" 
}));


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
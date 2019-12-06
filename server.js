const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const session = require('express-session');
// const path = require('path');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const save = require('./controllers/save');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,        
    }
});

const app = express();

app.use(session({
	secret: 'linkbox',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set('views', __dirname + '/views');
app.use( express.static( "public" ) );
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

var sesh;

//SERVER START
app.get('/', (req, res) => {
    sesh = req.session; 
    if(sesh.email) {
      let email = sesh.email;
      res.redirect('/profile');
      //res.render(__dirname + "views/profile.ejs", {email:"email test"});
    } else {
      res.sendFile('index.html', {root : __dirname + '/views'});
    }
})

app.get('/profile',function(req,res){
    sesh = req.session;
    if(sesh.email) {
      var email = sesh.email;
      var username = sesh.username;
      var profile_img = sesh.profile_img;
      res.render("profile.ejs", {
        email:email,
        username: username,
        profile_img: profile_img
      });
    } else {
      res.write('<h1>login first.</h1>');
      res.end('<a href="/">Login</a>');
    }
  });

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt, sesh) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/signout', (req, res) => { signout.handleSignout(req, res, db, sesh) })


app.put('/save', (req, res) => { save.handleSave(req, res, db, sesh) })
// app.put('/save', (req, res) => { 
//       res.write('<h1>login first.</h1>');
//       res.end('<a href="views/index.html">Login</a>');
//  })


//OFFLINE TEST
// app.get('/signin',(req,res) => {
//   sesh = req.session;
//   var email = "alex@gmail.com";
//   var username = "AlexanderGrxnt";
//   res.render("profile.ejs", {
//     email: email,
//     username: username
//   });
  
// });



app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

// app.get('/:username', (req, res) => {
//     res.render('views/alexander');
// })


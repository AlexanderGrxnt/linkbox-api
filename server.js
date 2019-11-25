const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const session = require('express-session');
// const path = require('path');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

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

var sesh;

//SERVER START
app.get('/', (req, res) => {
    sesh = req.session; 
    if(sesh.email) {
      res.redirect('/profile');
    } else {
      res.render('index.html');
    }
})

app.get('/profile',function(req,res){
    sesh = req.session;
    if(ssn.email) {
      res.write('<h1>Hello '+sesh.email+'</h1>');
      res.end('<a href="+">Logout</a>');
    } else {
      res.write('<h1>login first.</h1>');
      res.end('<a href="+">Login</a>');
    }
  });

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })





app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

app.get('/:username', (req, res) => {
    res.render('views/alexander');
})


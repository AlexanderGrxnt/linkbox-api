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

// app.use(session({
// 	secret: 'linkbox',
// 	resave: true,
// 	saveUninitialized: true
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.get('/', (req, res) => {
    res.send('It is working!');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
// app.post('/signin', (req, res) => { 
//     res.send('Signin working!'); 
// })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

app.get('/alexander', (req, res) => {
    res.render('views/alexander');
})


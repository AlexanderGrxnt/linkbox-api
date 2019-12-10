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
const signout = require('./controllers/signout');

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
app.use(express.static("public"));
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

var sesh;

//SERVER START
app.get('/', (req, res) => {
  sesh = req.session;
  if (sesh.email) {
    let email = sesh.email;
    res.redirect('/profile');
    //res.render(__dirname + "views/profile.ejs", {email:"email test"});
  } else {
    res.sendFile('index.html', { root: __dirname + '/views' });
  }
})

app.get('/profile', function (req, res) {
  sesh = req.session;
  if (sesh.email) {
    var email = sesh.email;
    var username = sesh.username;
    var profile_img = sesh.profile_img;
    if (profile_img === null)
      profile_img = "/logos/plus_image.png";

    res.render("profile.ejs", {
      email: email,
      username: username,
      profile_img: profile_img
    });
  } else {
    res.write('<h1>login first.</h1>');
    res.end('<a href="/">Login</a>');
  }
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt, sesh) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, sesh) })

app.get('/signout', (req, res, next) => {
  signout.handleSignout(req, res, db, sesh)
})

//START OF ONLINE CODE ONLY

app.put('/save', (req, res) => { save.handleSave(req, res, db, sesh) })

app.get('/data', (req, res) => {
  let logoArray = req.session.logoArr;
  if (logoArray === null) {
    logoArray = ['facebook', 'Instagram', 'youtube', 'twitter', 'snapchat', 'gmail'];
  }
  res.json({

    profileImg: req.session.profile_img,
    linkArr: req.session.linkArr,
    logoArr: logoArray
  });
})

app.get('/:username', (req, res) => {
  const userID = req.params.username;

  db.select('profile_img').from('users')
    .where('username', '=', userID)
    .then(data => {
      let profile_img = data[0].profile_img;
      if (profile_img === null)
        profile_img = "/logos/profile.png";
      res.render("alexander.ejs", {
        profile_img: profile_img,
        username: userID,
      });
    })
})

//END OF ONLINE CODE

//OFFLINE TEST
//app.put('/save', (req, res) => { res.end('ended') })

//app.get('/signin',(req,res) => {
//   sesh = req.session;
//   var email = "alex@gmail.com";
//   var username = "AlexanderGrxnt";
//   var profile_img = "https://picsum.photos/200";

//   res.render("profile.ejs", {
//     email: email,
//     username: username,
//     profile_img: JSON.stringify(profile_img)
//   });
// });

// app.get('/data', (req, res) => {
//   var profile_img = "https://picsum.photos/200";
//   res.json({
//     profile_img: JSON.stringify(profile_img),
//     linkArr: req.session.linkArr,
//     logoArr: ['facebook', 'Instagram', 'youtube', 'twitter', 'snapchat', 'gmail']
//   });
// })

// app.get('/:username', (req, res) => {
//   const userID = req.params.username;
//   res.render("live_page.ejs", {
//     profile_img: "/logos/profile.png",
//     username: userID,
//   });
// })

//END OF OFFLINE TEST


app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})




const handleSignin = (req, res, db, bcrypt, sesh) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return  res.status(400).json('incorrect form submission');
      }
   db.select('email', 'hash').from('login')
   .where('email', '=', email)
   .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                //res.json(user[0])
                //res.redirect(`http://127.0.0.1:8080/${user[0].username}.html`);
                sesh = req.session; 
                sesh.email = user[0].email;
                sesh.username = user[0].username;
                sesh.profile_img = user[0].profile_img;
                sesh.linkArr = user[0].linkarr;
                sesh.logoArr = user[0].logoarr;
                res.redirect('/profile');
            })
          .catch(err => res.status(400).json('unable to get user'))
        } else {
            res.status(400).json('wrong credentials')
        }
   })
   .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
}
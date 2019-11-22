const handleRegister = (req, res, db, bcrypt) => {
    const { username, email, password } = req.body;
    if(!email || !username || !password) {
      //return  res.status(400).json('email or user or password not received');
      return res.send(req.body);
    }
    const hash = bcrypt.hashSync(password);
    console.log("before transaction");
    
    db.transaction(trx => {
        console.log("db transaction");
        trx.insert({
            
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        username: username,
                        joined: new Date()
                    })
                    .then(user => {
                        //res.json(user[0]);
                        res.send('Registered!');
                    })
            })
            .then(trx.commit)
             .catch(trx.rollback)
            
    })
    .catch(err => res.status(400).json('unable to register'))
    

}


module.exports = {
    handleRegister: handleRegister
};
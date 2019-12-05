const handleSave = (req, res, db, sesh) => {
    const { url } = req.body;
    
    let username = sesh.username;
    console.log(username);
    console.log(url);
    db('users').where('username',username).update({
        profile_img:url
    }).then(user => {
        res.send('Registered!');
        console.log("registered");
    }).catch(err => res.status(400).json('unable to save'))

        // db.transaction(trx => {
        // trx.insert({
            
        //     hash: hash,
        //     email: email
        // })
        //     .into('login')
        //     .returning('email')
        //     .then(loginEmail => {
        //         return trx('users')
        //             .returning('*')
        //             .insert({
        //                 email: loginEmail[0],
        //                 username: username,
        //                 joined: new Date()
        //             })
        //             .then(user => {
        //                 //res.json(user[0]);
        //                 res.send('Registered!');
        //             })
             
        // .then(trx.commit)
        // .catch(trx.rollback)
        // })
}

module.exports = {
    handleSave: handleSave
};
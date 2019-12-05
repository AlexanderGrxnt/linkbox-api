const handleSave = (req, res, db, sesh) => {
    const { url } = req.body;
    console.log(sesh.username);
    
    db('users').where('username', '=', sesh.username)
    .update('profile_img', url)
    .then(user => {
        res.send('Registered!');
        console.log("registered");
    })

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
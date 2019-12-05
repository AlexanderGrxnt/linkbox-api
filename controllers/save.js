const handleSave = (req, res, db, sesh) => {
    const { url } = req.body;
    db.transaction(trx => {
        db('users').transacting(trx)
        .where({username: sesh.username})
        .update({profile_img: url})
        .then(user => {
            res.send('Registered!');
        })
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
             
        .then(trx.commit)
        .catch(trx.rollback)
        })
}

module.exports = {
    handleSave: handleSave
};
const handleSave = (req, res, db, sesh) => {
    const { profileAddress } = req.body;
    
    let username = sesh.username;
    console.log(username);
    console.log(profileAddress);
    db('users').where('username',username).update({
        profile_img:profileAddress
    }).then(user => {
        res.send('Registered!');
        console.log("registered");
        sesh.profile_img = profileAddress;
    }).catch(err => res.status(400).json('unable to save'))
      
}

module.exports = {
    handleSave: handleSave
};
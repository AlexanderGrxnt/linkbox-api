const handleSave = (req, res, db, sesh) => {
    const { profileAddress } = req.body;
    
    let username = sesh.username;
    console.log(username);
    console.log(profileAddress);
    db('users').where('username',username).update({
        profile_img:profileAddress
    }).then(user => {
        sesh = req.session; 
        
        console.log("registered");
        sesh.profile_img = profileAddress;
        res.send('Registered!');
    }).catch(err => res.status(400).json('unable to save'))
      
}

module.exports = {
    handleSave: handleSave
};
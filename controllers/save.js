const handleSave = (req, res, db, sesh) => {
    const { profileAddress, linkArr, logoArr } = req.body;
    
    let username = sesh.username;
    
    console.log(username);
    console.log(profileAddress);
    db('users').where('username',username).update({
        profile_img:profileAddress,
        
        linkarr:linkArr,
        logoarr:logoArr
    }).then(user => {
        sesh = req.session; 
        
        console.log("registered");
        sesh.profile_img = profileAddress;
        sesh.linkArr = linkArr;
        sesh.logoArr = logoArr;
        res.send('Saved!');
    }).catch(err => res.status(400).json('unable to save'))
      
}

module.exports = {
    handleSave: handleSave
};
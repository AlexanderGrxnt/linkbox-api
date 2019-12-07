const handleSignout = (req, res, db, sesh) => {
    sesh = req.session; 
    sesh.destroy();

    res.redirect('/');
    //res.sendFile('index.html', {root : __dirname + '/views'});

      
}

module.exports = {
    handleSignout: handleSignout
};
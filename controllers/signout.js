const handleSignout = (req, res, db, sesh) => {
    sesh.destroy();
    res.redirect('/');
    
      
}

module.exports = {
    handleSignout: handleSignout
};
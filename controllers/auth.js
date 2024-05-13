const User =require('../models/User');
exports.getLogin = (req, res) => {
    // const isLoggedIn=req.get('Cookie').split('=')[1]
    // console.log(req.get('Cookie').split('=')[1])
   console.log( req.session.isLoggedIn)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated:false
    });
};

exports.postLogin = (req, res) => {
    User.findById('663f4d13d31dab3637f2042d')
        .then(user => {
            req.session.isLoggedIn=true
            req.session.user = user; 
            req.session.save(()=>{
                res.redirect('/');
            })   
          
        }).catch(err => {
            console.log(err);
        })
  
};
exports.postLogout = (req,res)=>{
    req.session.destroy(error=>{
         if (error) {
            console.log(error);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/');
    });
}
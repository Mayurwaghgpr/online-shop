exports.Page404=(req, res, next) => {
    res.status(404).render('PageError',{path:'Error',pageTitle:'404',  isAuthenticated:req.session.isLoggedIn});
}
exports.Page404=(req, res, next) => {
    res.status(404).render('PageError',{pageTitle:'404'});
}
const controller = {};

controller.signin = (req,res) =>{
    req.app.locals.user = true
    res.render('index');
}

controller.signout = (req,res) =>{
    req.app.locals.user = false
    res.render('index');
}

module.exports = controller;
const controller = {};

controller.mainp = (req,res) =>{
    res.render('index');
};

controller.list = (req,res) =>{
    if(!req.app.locals.user){
        res.redirect('/');
        next();
    }
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM product', (err, prod) => {
         if (err) {
          res.json(err);
         }
         res.render('filters/objlist', { prod });
        });
    });
};

controller.delete = (req,res) =>{
    if(!req.app.locals.user){
        res.redirect('/')
    }
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM product WHERE id = ?', [id], (err, prod) => {
         if (err) {
          res.json(err);
         }
         res.redirect('/objlist');
        });
    });
};

controller.redirect = (req,res) =>{
    res.redirect('/');
};

controller.add = (req,res) =>{
    if(!req.app.locals.user){
        res.redirect('/')
    }
    const data = req.body;
    console.log(req.body);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO product set ?', data, (err,prod) => {
            res.redirect('/objlist');
        }); 
    });
};

module.exports = controller;
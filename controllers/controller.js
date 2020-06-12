const controller = {};

controller.list = (req,res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM product', (err, prod) => {
         if (err) {
          res.json(err);
         }
         res.render('index', { prod });
        });
    });
};

controller.delete = (req,res) =>{
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM product WHERE id = ?', [id], (err, prod) => {
         if (err) {
          res.json(err);
         }
         res.redirect('/');
        });
    });
};

controller.redirect = (req,res) =>{
    res.redirect('/');
};

controller.add = (req,res) =>{
    const data = req.body;
    console.log(req.body);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO product set ?', data, (err,prod) => {
            res.redirect('/');
        }); 
    });
};

module.exports = controller;
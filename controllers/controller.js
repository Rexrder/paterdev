const controller = {};

controller.list = (req,res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM product', (err, prod) => {
         if (err) {
          res.json(err);
         }
         res.render('index', {prod});
        });
    });
};

module.exports = controller;
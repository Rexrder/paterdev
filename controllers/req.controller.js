const controller = {};

const pool = require('../database');

controller.list = async (req,res) =>{
    const listed = await pool.query('SELECT request.id, product.p_name, request.quantity, request.reqtype, request.dat, user.username FROM request INNER JOIN user ON request.user = user.id INNER JOIN product ON request.prod = product.id');
    const product = await pool.query('SELECT * FROM product');
    for (var i in listed){
        listed[i].reqtype = (listed[i].reqtype == 1) ? "Deposit":"Withdrawal";
    };
    //console.log(listed);
    res.render('filters/reqlist', {listed,product});
};

controller.add = async (req,res) =>{
    const {prod, quantity, reqtype} = req.body;
    const newRequest = {
        prod,
        quantity,
        reqtype,
        user: req.user.id
    };
    const init_quantity = await pool.query('SELECT quantity FROM product WHERE id = ?',[prod]);
    if (reqtype == 0) {
        var quantity_result = parseInt(init_quantity[0].quantity) - parseInt(quantity);
        if (quantity_result < 0){
            req.flash('message', 'Not Enough Products in Stock');
            res.redirect('/reqlist');
            return;
        };
    }
    else{
        var quantity_result = parseInt(init_quantity[0].quantity) + parseInt(quantity);
    };
    console.log(init_quantity[0].quantity);
    console.log(quantity_result);

    await pool.query('INSERT INTO request set ?', [newRequest]);
    await pool.query('UPDATE product set quantity = ? WHERE id = ?', [quantity_result,prod]);
    req.flash('success', 'Request Done Successfully');
    res.redirect('/reqlist'); 
};

module.exports = controller;
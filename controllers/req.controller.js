const controller = {};

const pool = require('../database');

controller.list = async (req,res) =>{
    const listed = await pool.query('SELECT request.id, product.p_name, request.quantity, request.dat, user.username FROM request INNER JOIN user ON request.user = user.id INNER JOIN product ON request.prod = product.id');
    var type = (listed.quantity > 0) ? "Deposit":"Withdrawal";
    res.render('filters/reqlist', {listed});
};

controller.redirect = async (req,res) =>{
    res.redirect('/');
};

controller.add = async (req,res) =>{
    const data = req.body;
    await pool.query('INSERT INTO request set ?', data);
    res.redirect('/reqlist'); 
};

module.exports = controller;
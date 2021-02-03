const controller = {};

const pool = require('../database');

controller.list = async (req,res) =>{
    const prod = await pool.query('SELECT *, (quantity * cost_unit) FROM product');
    res.render('filters/objlist', {prod});
};

controller.delete = async (req,res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM product WHERE id = ?', [id]);
    req.flash('success', 'Product Removed Successfully');
    res.redirect('/objlist'); 
};

controller.redirect = async (req,res) =>{
    res.redirect('/');
};

controller.add = async (req,res) =>{
    const data = req.body;
    await pool.query('INSERT INTO product set ?', data);
    res.redirect('/objlist'); 
};

module.exports = controller;
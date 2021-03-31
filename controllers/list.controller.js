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

controller.add = async (req,res) =>{
    const data = req.body;
    await pool.query('INSERT INTO product set ?', data);
    res.redirect('/objlist'); 
};

controller.renderEdit = async (req,res) =>{
    const { id } = req.params;
    const prod = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
    res.render('edit/products', {prods: prod[0]}); 
};

controller.edit = async (req,res) =>{
    const { id } = req.params;
    const data = req.body;
    await pool.query('UPDATE product set ? WHERE id = ?', [data,id]);
    res.redirect('/objlist'); 
};


module.exports = controller;
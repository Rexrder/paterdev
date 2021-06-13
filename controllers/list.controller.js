const controller = {};

const pool = require('../database');

controller.list = async (req,res) =>{
    const prod = await pool.query('SELECT product.id, product.p_name, product.quantity, product.cost_unit, drawsep.drawer, (product.quantity * product.cost_unit) FROM product INNER JOIN prod_drawer ON product.id = prod_drawer.idprod INNER JOIN drawsep ON prod_drawer.iddraw = drawsep.id');
    const tot = await pool.query('SELECT SUM(quantity*cost_unit) AS total FROM product');
    var sum = {total: tot[0].total};
    console.log(sum);
    res.render('filters/objlist', {prod,sum});
};

controller.delete = async (req,res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM product WHERE id = ?', [id]);
    req.flash('success', 'Product Removed Successfully');
    res.redirect('/objlist'); 
};

controller.add = async (req,res) =>{
    const {p_name,quantity,cost_unit,drawer,sep,part} = req.body;
    const NewProd ={
        p_name,
        quantity,
        cost_unit
    }

    const drawsepInfo ={
        drawer,
        sep,
        part
    }

    const drawsepId = await pool.query('SELECT id FROM drawsep WHERE drawer = ? and sep = ? and part = ?', [drawsepInfo.drawer,drawsepInfo.sep,drawsepInfo.part]);

    const confirmExistence = await pool.query('SELECT id FROM prod_drawer WHERE iddraw = ?', drawsepId[0].id);
    
    console.log(confirmExistence);

    if (confirmExistence[0]) {
        req.flash('message', 'There is another product in this specific drawer/separator');
    }else{
        const {insertId} = await pool.query('INSERT INTO product set ?', NewProd);

        const prodDrawer = {
            idprod: insertId,
            iddraw: drawsepId[0].id
        }
        await pool.query('INSERT INTO prod_drawer set ?', prodDrawer);
        req.flash('success', 'Product Added Successfully');
    }

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
    req.flash('success', 'Product Updated Successfully');
    res.redirect('/objlist'); 
};


module.exports = controller;
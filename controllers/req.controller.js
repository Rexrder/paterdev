const controller = {};

const pool = require('../database');
const eventEmitter = require('../lib/events');

controller.list = async (req,res) =>{
    const listed = await pool.query('SELECT request.id, product.p_name, request.quantity, request.reqtype, request.dat, user.username FROM request INNER JOIN user ON request.user = user.id INNER JOIN product ON request.prod = product.id ORDER BY request.dat DESC');
    const product = await pool.query('SELECT * FROM product');
    for (var i in listed){
        listed[i].reqtype = (listed[i].reqtype == 1) ? "Deposit":"Withdrawal";
    };
    //console.log(listed);
    res.render('filters/reqlist', {listed,product});
};

controller.add = async (req,res) =>{
    var io = req.app.get('socketio');
    const {prod, quantity, reqtype} = req.body;
    const newRequest = {
        prod,
        quantity,
        reqtype,
        user: req.user.id
    };

    const init_quantity = await pool.query('SELECT quantity FROM product WHERE id = ?',[prod]);
    const newDraw = await pool.query('SELECT drawer FROM drawsep INNER JOIN prod_drawer ON drawsep.id = prod_drawer.iddraw INNER JOIN product ON prod_drawer.idprod = product.id WHERE product.id = ?',[prod]); 

    console.log(req.app.locals.reqInProg);

    if (!req.app.locals.reqInProg) {

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
        req.flash('success', 'Request Done Successfully');

        console.log(init_quantity[0].quantity);
        console.log(quantity_result);

        req.app.locals.storeRequest = newRequest;
        req.app.locals.storeQuantity = quantity_result;

        eventEmitter.emit('srcDraw',req.app.locals.draw,newDraw);

        req.app.locals.reqInProg = true;
    } else {
        req.flash('message', 'There is another request in progress');
    }
    res.redirect('/reqlist');
};

module.exports = controller;
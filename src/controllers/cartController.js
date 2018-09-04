const Product = require("../db/models").Product;
const cartQueries = require("../db/queries.cart.js");

module.exports = {
    index(req, res, next){
        res.send("TODO: list cart items");
    },

    show(req, res, next){
        cartQueries.getCart(req.params.id, (err, cart) => {
            if(err || cart == null){
                res.redirect(404, "/");
            } else {
                console.log(cart);
                console.log(cart.Product.dataValue);
                res.render("cart", {cart});
            }
        });
    },

    add(req, res, next){
        cartQueries.addToCard(req.params.id, (err, cart) => {
            if(err || cart == null){
                res.redirect(404, "/");
            } else {
                res.render("cart", {cart})
            }
        })
    }
    

    

    // addToCart(req, res, next){
    //     req.session.cart = req.session.cart || {};
    //     var cart = req.session.cart;

    //     Product.findOne({id: req.params.id}, function(err, product){
    //         if(err){
    //             console.log(err);
    //         }
    //         if(cart[req.params.id]){ 
    //             cart[req.params.id].qty++
    //         } else {
    //             cart[req.params.id] = {
    //                 item: product.id,
    //                 title: product.title,
    //                 price: product.price,
    //                 qty: 1
    //             }
    //         }
    //         res.redirect("/cart");
    //     })
    // }

}
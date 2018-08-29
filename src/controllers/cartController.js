const Product = require("../db/models").Product;
const cartQueries = require("../db/queries.cart.js");

module.exports = {
    index(req, res, next){
        //Get cart from session
        var cart = req.session.cart;
        var displayCart = {products: [], total:0};
        var total = 0;

        //Get total
        for(var item in cart){
            displayCart.items.push(cart[product]);
            total += (cart[product].qty * cart[product].price);
        }
        displayCart.total = total;
        // Render cart view
        res.render('cart/index', {
            cart: displayCart
        });
    },

    show(req, res, next){
        cartQueries.getCart(req.params.id, (err, cart) => {
            if(err || cart == null){
                res.redirect(404, "/");
            } else {
                res.render("cart/index", {cart});
            }
        });
    },

    add(req, res, next){
        cartQueries.addToCard(req.params.id, (err, cart) => {
            if(err || cart == null){
                res.redirect(404, "/");
            } else {
                res.render("cart/index", {cart})
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
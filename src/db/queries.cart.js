const Product = require("./models").Product;

const session = require("express-session");

module.exports = {



    getCart(id, callback){
        return Product.findById(id)
        .then((product) => {
            callback(null, product);
        })
        .catch((err) => {
            callback(err);
        })
    },

    addToCard(req, id){
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        return Product.findById(id, function(err, product){
            if(err){
                console.log(err);
            }
            if(cart[req.params.id]){
                cart[req.params.id].qty++
            } else {
                cart[req.params.id] = {
                    item: product.id,
                    title: product.title,
                    price: product.price,
                    qty: 1
                }

            }
            
        })

    }
   
}
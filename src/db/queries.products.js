const Product = require("./models").Product;
// const Authorizer = require("../policies/product");

module.exports = {
    getAllProducts(callback){
        return Product.all()
        .then((products) => {
            callback(null, products);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getProduct(id, callback){
        return Product.findById(id)
        .then((product) => {
            callback(null, product);
        })
        .catch((err) => {
            callback(err);
        })
    },
    addProduct(newProduct, callback){
        return Product.create({
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price
        })
        .then((product) => {
            callback(null, product);
        })
        .catch((err) => {
            callback(err);
        })
    },
    deleteProduct(req, callback){
        return Product.findById(req.params.id)
        .then((product) => {
            const authorized = new Authorizer(req.user, product).destroy();
            if(authorized){
                product.destroy()
                .then((res) => {
                    callback(null, product);
                });
            } else {
                req.flash("notice", "You are not authorized to do that.")
                callback(401);
            }
        })
        .catch((err) => {
            callback(err);
        });
    },
    updateProduct(req, updatedProduct, callback){
        return Product.findById(req.params.id)
        .then((product) => {
            if(!product){
                return callback("Product not found");
            }
            const authorized = new Authorizer(req.user, product).update();
            if(authorized){


            product.update(updatedProduct, {
                fields: Object.keys(updatedProduct)
            })
            .then(() => {
                callback(null, product);
            })
            .catch((err) => {
                callback(err);
            });
        } else {
            req.flash("notice", "You are not authorized to do that.");
            callback("Forbidden");
        }
        });
    }
}
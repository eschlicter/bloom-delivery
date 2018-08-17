const productQueries = require("../db/queries.products.js");
const Authorizer = require("../policies/product");

module.exports = {
    index(req, res, next){
        
        productQueries.getAllProducts((err, products) => {
            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("products/index", {products});
            }
        })
    },

    new(req, res, next){
        const authorized = new Authorizer(req.user).new();
        if(authorized){
            res.render("products/new");
        } else {
            req.flash("notice", "You are not authorized to do that.");
            res.redirect("/products");
        }
    },

    create(req, res, next){
        const authorized = new Authorizer(req.user).create();
        if(authorized){
            let newProduct = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            };
            productQueries.addProduct(newProduct, (err, product) => {
                if(err){
                    res.redirect(500, "products/new");
                } else {
                    res.redirect(303, `/products/${product.id}`);
                }
            });
        } else {
            req.flash("notice", "You are not authorized to do that.");
            res.redirect("/products");
        }
    },
    show(req, res, next){
        productQueries.getProduct(req.params.id, (err, product) => {
            if(err || product == null){
                res.redirect(404, "/");
            } else {
                res.render("products/show", {product});
            }
        });
    },
    destroy(req, res, next){
        productQueries.deleteProduct(req, (err, product) => {
            if(err){
                res.redirect(500, `/products/${req.params.id}`)
            } else {
                res.redirect(303, "/products")
            }
        });
    },
    edit(req, res, next){
        productQueries.getProduct(req.params.id, (err, product) => {
            if(err|| product == null){
                res.redirect(404, "/");
            } else {
                const authorized = new Authorizer(req.user, product).edit();
                if(authorized){
                    res.render("products/edit", {product});
                } else {
                    req.flash("You are not authorized to do that.")
                    res.redirect(`/products/${req.params.id}`)
                }
            }
        });
    },
    update(req, res, next){
        productQueries.updateProduct(req, req.body, (err, product) =>{
            if (err || product == null){
                res.redirect(404, `/products/${req.params.id}/edit`);
            } else {
                res.redirect(`/products/${req.params.id}`);
            }
        });
    }
}
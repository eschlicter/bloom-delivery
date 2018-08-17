const productQueries = require("../db/queries.products.js");
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
        res.render("products/new");
    },

    create(req, res, next){
        let newProduct = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        };
        productQueries.addProduct(newProduct, (err, product) => {
            if(err){
                res.redirect(500, "/products/new");
            } else {
                res.redirect(303, `/products/${product.id}`);
            }
        });
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
        productQueries.deleteProduct(req.params.id, (err, product) => {
            if(err){
                res.redirect(500, `/products/${product.id}`)
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
                res.render("products/edit", {product});
            }
        });
    },
    update(req, res, next){
        productQueries.updateProduct(req.params.id, req.body, (err, product) =>{
            if (err || product == null){
                res.redirect(404, `/products/${req.params.id}/edit`);
            } else {
                res.redirect(`/products/${product.id}`);
            }
        });
    }
}
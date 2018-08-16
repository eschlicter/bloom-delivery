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
    }
}
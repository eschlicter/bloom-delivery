const Product = require("./models").Product;

module.exports = {
    getAllProducts(callback){
        return Product.all()
        .then((products) => {
            callback(null, products);
        })
        .catch((err) => {
            callback(err);
        })
    }
}
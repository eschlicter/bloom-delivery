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
    deleteProduct(id, callback){
        return Product.destroy({
            where: {id}
        })
        .then((product) => {
            callback(null, product);
        })
        .catch((err) => {
            callback(err);
        })
    },
    updateProduct(id, updatedProduct, callback){
        return Product.findById(id)
        .then((product) => {
            if(!product){
                return callback("Product not found");
            }
            product.update(updatedProduct, {
                fields: Object.keys(updatedProduct)
            })
            .then(() => {
                callback(null, product);
            })
            .catch((err) => {
                callback(err);
            });
        });
    }
}
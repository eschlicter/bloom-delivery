module.exports = {
    init(app){
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");
        const productRoutes = require("../routes/products");

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(productRoutes);
    }
}
module.exports = {
    init(app){
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");
        const productRoutes = require("../routes/products");
        const cartRoutes = require("../routes/cart");

        if(process.env.NODE_ENV === "test") {
            const mockAuth = require("../../spec/support/mock-auth.js");
            mockAuth.fakeIt(app);
        }

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(cartRoutes);
        app.use(productRoutes);
        
    }
}
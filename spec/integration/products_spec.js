const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/products/"

const sequelize = require("../../src/db/models").sequelize;
const Product = require("../../src/db/models").Product;

describe("routes : products", () => {

    beforeEach((done) => {
        this.product;
        sequelize.sync({force: true}).then((res) => {
            Product.create({
                title: "this is a title",
                description: "this is a description",
                price: 10
            })
            .then((product) => {
                this.product = product;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("GET /products", () => {
        it("should return a status code of 200 and all products", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Products");
                expect(body).toContain("this is a title");
                done();
            });
        });
    });
});
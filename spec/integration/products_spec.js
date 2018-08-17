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
    describe("GET /products/new", () => {
        it("should render a new product form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Product");
                done();
            });
        });
    });
    describe("POST /products/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                title: "sample product",
                description: "sample description",
                price: 10
            }
        };
        it("should create a new product and redirect", (done) => {
            request.post(options, 
            (err, res, body) => {
                Product.findOne({where: {title:"sample product"}})
                .then((product) => {
                    expect(res.statusCode).toBe(303);
                    expect(product.title).toBe("sample product");
                    expect(product.description).toBe("sample description");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
                
            }
            );
        });
    });
    describe("GET /products/:id", () => {
        it("should render a view with the selected product", (done) => {
            request.get(`${base}${this.product.id}`, (err, res, body) => {
                expect(err).toBeNull();
                done();
            });
        });
    });
    describe("POST /products/:id/destroy", () => {
        it("should delete the topic with the associated ID", (done) => {
            Product.all()
            .then((products) => {
                const productCountBeforeDelete = products.length;

                expect(productCountBeforeDelete).toBe(1);

                request.post(`${base}${this.product.id}/destroy`, (err, res, body) => {
                    Product.all()
                    .then((products) => {
                        expect(err).toBeNull();
                        expect(products.length).toBe(productCountBeforeDelete - 1);
                        done();
                    })
                });
            });
        });
    });
    describe("GET /products/:id/edit", () => {
        it("should render a view with an edit product form", (done) => {
            request.get(`${base}${this.product.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Product");
                done();
            });
        });
    });
    describe("POST /products/:id/update", () => {
        it("should update the product with the given values", (done) => {
            const options = {
                url: `${base}${this.product.id}/update`,
                form: {
                    title: "example title",
                    description: "example description",
                    price: 10
                }
            };
            request.post(options, (err, res, body) => {
                expect(err).toBeNull();

                Product.findOne({
                    where: {id: this.product.id}
                })
                .then((product) => {
                    expect(product.title).toBe("example title");
                    done();
                });
            });
        });
    });
    
});
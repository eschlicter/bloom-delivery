const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/products/";

const sequelize = require('../../src/db/models/index').sequelize;
const Product = require("../../src/db/models").Product;
const User = require("../../src/db/models").User;

describe("routes : products", () => {

  beforeEach((done) => { // before each context     
    this.product;   // define variables and bind to context
    sequelize.sync({ force: true }).then(() => {  // clear database
      Product.create({
        title: "JS Frameworks",
        description: "There is a lot of them",
        price: 10
      })
      .then((res) => {
        this.product = res;  // store resulting topic in context
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
  });

  // context of admin user
  describe("admin user performing CRUD actions for Product", () => {

    beforeEach((done) => {  // before each suite in admin context
      request.get({         // mock authentication
        url: "http://localhost:3000/auth/fake",
        form: {
          role: "admin"     // mock authenticate as admin user
        }
      });
      done();
    });

    describe("GET /products", () => {

      it("should respond with all products", (done) => {
        request.get(base, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Products");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("GET /products/new", () => {

      it("should render a view with a new product form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          done();
        });
      });

    });

    describe("POST /products/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?",
          price: 10
        }
      };

      it("should create a new product and redirect", (done) => {
        request.post(options,
          (err, res, body) => {
            Product.findOne({where: {title: "blink-182 songs"}})
            .then((product) => {
              expect(product.title).toBe("blink-182 songs");
              expect(product.description).toBe("What's your favorite blink-182 song?");
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
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("POST /products/:id/destroy", () => {


      it("should delete the product with the associated ID", (done) => {
        Product.all()
        .then((products) => {
          const productCountBeforeDelete = products.length;

          expect(productCountBeforeDelete).toBe(1);

          request.post(`${base}${this.product.id}/destroy`, (err, res, body) => {
            Product.all()
            .then((products) => {
              expect(err).toBeNull();
              done();
            })

          });
        })

      });

    });

    describe("GET /products/:id/edit", () => {

      it("should render a view with an edit product form", (done) => {
        request.get(`${base}${this.product.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("POST /products/:id/update", () => {

      it("should update the product with the given values", (done) => {
        request.post({
          url: `${base}${this.product.id}/update`,
          form: {
            title: "JavaScript Frameworks",
            description: "There are a lot of them"
          }
        }, (err, res, body) => {
          expect(err).toBeNull();
          Product.findOne({
            where: {id:1}
          })
          .then((product) => {
            done();
          });
        });
      });

    });

  }); //end context for admin user

  // context of member user
  describe("member user performing CRUD actions for Product", () => {

    beforeEach((done) => {  // before each suite in admin context
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          role: "member"
        }
      });
      done();
    });

    describe("GET /products", () => {

      it("should respond with all products", (done) => {
        request.get(base, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Products");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("GET /products/new", () => {

      it("should redirect to products view", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Products");
          done();
        });
      });

    });

    describe("POST /products/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?",
          price: 10
        }
      }

      it("should not create a new product", (done) => {
        request.post(options,
          (err, res, body) => {
            Product.findOne({where: {title: "blink-182 songs"}})
            .then((product) => {
              expect(product).toBeNull(); // no product should be returned
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
        // variables defined outside, like `this.product` are only available
        // inside `it` blocks.
        request.get(`${base}${this.product.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });

    describe("POST /products/:id/destroy", () => {

      it("should not delete the product with the associated ID", (done) => {

        Product.all()
        .then((product) => {
          const productCountBeforeDelete = product.length;

          expect(productCountBeforeDelete).toBe(1);

          request.post(`${base}${this.product.id}/destroy`, (err, res, body) => {
            Product.all()
            .then((products) => {
              // confirm that no products were deleted
              expect(products.length).toBe(productCountBeforeDelete);
              done();
            })

          });
        })

      });

    });

    describe("GET /products/:id/edit", () => {

      it("should not render a view with an edit product form", (done) => {

        request.get(`${base}${this.product.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).not.toContain("Edit Product");
          expect(body).toContain("JS Frameworks"); // confirm redirect to product show
          done();
        });
      });

    });

    describe("POST /products/:id/update", () => {

      it("should not update the product with the given values", (done) => {
        const options = {
          url: `${base}${this.product.id}/update`,
          form: {
            title: "JavaScript Frameworks",
            description: "There are a lot of them",
            price: 10
          }
        }

        request.post(options,
        (err, res, body) => {
          expect(err).toBeNull();
          Product.findOne({
            where: { id:1 }
          })
          .then((product) => {
            expect(product.title).toBe("JS Frameworks"); // confirm title is unchanged
            done();
          });
        });
      });

    });

  });

});
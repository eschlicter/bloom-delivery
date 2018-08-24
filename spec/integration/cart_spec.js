const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/cart/";

describe("routes : cart", () => {

  describe("GET /cart", () => {

    it("should return a status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });
});
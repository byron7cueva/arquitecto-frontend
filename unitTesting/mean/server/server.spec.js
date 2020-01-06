const express = require("express");
const logger = require("morgan");
const http = require("http");
const PinsRouter = require("./routes/pins");
const request = require("request");
var requestPromise = require('request-promise-native');
const axios = require("axios");
var Pins = require("./models/Pins.js");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use("/api", PinsRouter.router);
app.set("port", 3000);

describe("Testing Router", () => {
  let server;
  const data = [{
    id: 1
  }];
  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET", () => {
    it("200 and find pin", done => {
      //Espias
      spyOn(Pins, "find").and.callFake(callback => {
        callback(false, data);
      });

      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{
          id: 1
        }]);
        done();
      });
    });

    //Get 500
    it("500", done => {
      //Espias
      spyOn(Pins, "find").and.callFake(callback => {
        callback(true, data);
      });

      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

  describe('Find by id', () => {
    it("200 Find by id", done => {
      spyOn(Pins, "findById").and.callFake((id, callback) => {
        //Parametros que contiene la funcion a interceptar en este caso findById
        callback(false, data);
      });

      request.get("http://localhost:3000/api/1", (error, response, body) => {
        expect(JSON.parse(response.body)).toEqual([{
          id: 1
        }]);
        done();
      });
    });

    it("500 find by id", done => {
      spyOn(Pins, "findById").and.callFake((id, callback) => {
        //Parametros que contiene la funcion a interceptar en este caso findById
        callback(true, null);
      });

      request.get("http://localhost:3000/api/1", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

  describe("POST", () => {
    const post = [{
      title: "Platzi",
      author: "Platzi",
      description: "Platzi rules",
      percentage: 0,
      tags: [],
      assets: []
    }];

    it("200", done => {
      spyOn(Pins, "create").and.callFake((post, callback) => {
        callback(false, {});
      });

      spyOn(requestPromise, "get").and.returnValue(
        Promise.resolve(
          '<title>Platzi Error</title><meta name="description" content="Platzi rules">'
        )
      );

      const assets = [{
        url: "http://platzi.com"
      }];
      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets
        })
        .then(res => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it('200 PDF', done => {
      spyOn(Pins, 'create').and.callFake((pins, callback) => {
        callback(false, {});
      });

      const assets = [{
        url: "http://platzi.pdf"
      }];
      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets
        })
        .then(res => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it("500", done => {
      spyOn(Pins, "create").and.callFake((post, callback) => {
        callback(true, null);
      });

      spyOn(requestPromise, "get").and.returnValue(
        Promise.resolve(
          '<title>Platzi</title><meta name="description" content="Platzi rules">'
        )
      );

      const assets = [{
        url: "http://platzi.com"
      }];
      request
        .post("http://localhost:3000/api", {
          json: {
            title: "title",
            author: "author",
            description: "description",
            assets
          }
        }, (error, res, body) => {
          expect(res.statusCode).toBe(500);
          done();
        })
    });
  });

  describe('PUT', () => {
    it('200 PUT', done => {
      spyOn(Pins, 'findByIdAndUpdate').and.callFake((id, param, callback) => {
        callback(false, {});
      });

      request.put('http://localhost:3000/api/1', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('500 PUT', done => {
      spyOn(Pins, 'findByIdAndUpdate').and.callFake((id, param, callback) => {
        callback(true, null);
      });

      request.put('http://localhost:3000/api/1', (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

  describe('DELETE', () => {
    it('200 DELETE', done => {
      spyOn(Pins, 'findByIdAndRemove').and.callFake((id, param, callback) => {
        callback(false, {});
      });

      request.delete('http://localhost:3000/api/1', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('500 DELETE', done => {
      spyOn(Pins, 'findByIdAndRemove').and.callFake((id, param, callback) => {
        callback(true, null);
      });

      request.delete('http://localhost:3000/api/1', (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

});

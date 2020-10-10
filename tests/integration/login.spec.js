const supertest = require("supertest");
const mongoose = require("mongoose");
const { truncate } = require("../helpers");
const initServer = require("../../backend/server");

describe("login", () => {
  let server;
  let request;
  beforeAll(async () => {
    server = await initServer();
    request = supertest.agent(server);
  });

  afterAll(async () => {
    await truncate();
    await mongoose.disconnect();
    server.close();
  });

  describe("POST /register", () => {
    const endpoint = "/register";

    it("should register a new user successfully", async () => {
      const resp = await request
        .post(endpoint)
        .send({ username: "foobar", password: "secret" })
        .expect(200);

      const { token } = resp.body;
      expect(token).toBe(
        "0690367da7e512685a0d63fe9a1dc44df58ed8d8292ba0f2a3f4484bae0e779c0b1e319d1d06783d61519af0d200b993f8de67ffe5ee6f01a346a1999e7e2d42"
      );
    });

    it("should return 400 if username already used", async () => {
      await request
        .post(endpoint)
        .send({ username: "foobar", password: "secret" })
        .expect(400);
    });
  });

  describe("POST /login", () => {
    const endpoint = "/login";

    it("should return a token", async () => {
      const resp = await request
        .post(endpoint)
        .send({ username: "foobar", password: "secret" })
        .expect(200);

      const { token } = resp.body;
      expect(token).toBe(
        "0690367da7e512685a0d63fe9a1dc44df58ed8d8292ba0f2a3f4484bae0e779c0b1e319d1d06783d61519af0d200b993f8de67ffe5ee6f01a346a1999e7e2d42"
      );
    });

    it("should return 404 if credential is invalid", async () => {
      await request
        .post(endpoint)
        .send({ username: "foobar", password: "secret42" })
        .expect(403);
    });
  });
});

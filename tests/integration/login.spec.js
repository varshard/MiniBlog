const supertest = require("supertest");
const mongoose = require("mongoose");
const initServer = require("../../backend/server");

describe("login", () => {
  let server;
  let request;
  beforeAll(async () => {
    server = await initServer();
    request = supertest.agent(server);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    server.close();
  });

  describe("POST /login", () => {
    const endpoint = "/login";

    it("should return an encoded username", async () => {
      const resp = await request
        .post(endpoint)
        .send({ username: "foobar" })
        .expect(200);

      const { token } = resp.body;
      expect(token).toBe("Zm9vYmFy");
    });
  });
});

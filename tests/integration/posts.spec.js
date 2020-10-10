const supertest = require("supertest");
const mongoose = require("mongoose");
const { truncate } = require("../helpers");
const initServer = require("../../backend/server");

describe("posts", () => {
  const endpoint = "/posts";
  let server;
  let request;
  let token;
  let token2;
  beforeAll(async () => {
    server = await initServer();
    request = supertest.agent(server);

    const resp = await request
      .post("/register")
      .send({ username: "frodo", password: "secret" });

    token = resp.body.token;

    const resp2 = await request
      .post("/register")
      .send({ username: "sam", password: "secret" });

    token2 = resp2.body.token;
  });

  afterAll(async () => {
    await truncate();
    await mongoose.disconnect();
    server.close();
  });

  describe("POST /posts", () => {
    it("should create a post successfully", async () => {
      const resp = await request
        .post(endpoint)
        .send({
          name: "Hello Blog",
          content: "Lorem ipsum",
          status: "green",
        })
        .set("Authorization", token)
        .expect(200);

      const { body } = resp;
      expect(body.name).toBe("Hello Blog");
      expect(body.content).toBe("Lorem ipsum");
      expect(body.status).toBe("green");
      expect(body.author.name).toBe("frodo");
    });

    it("should return 403 if authorization header is missing", async () => {
      await request.post(endpoint).send({}).expect(403);
    });
  });

  describe("PATCH /posts", () => {
    it("should update a post successfully", async () => {
      const { _id: id } = await createPost(token);

      const resp = await request
        .patch(`${endpoint}/${id}`)
        .set("Authorization", token)
        .send({
          content: "dolor sit amet",
          author: "farboo",
        })
        .expect(200);

      const { body } = resp;
      expect(body.content).toBe("dolor sit amet");
      expect(body.name).toBe("Hello Blog");
      expect(body.status).toBe("green");
      expect(body.author.name).toBe("frodo");
    });

    it("should return 404 if the try to update a post that belong to another author", async () => {
      const { _id: id } = await createPost(token2);

      await request
        .patch(`${endpoint}/${id}`)
        .send({
          content: "dolor sit amet",
        })
        .set("Authorization", token)
        .expect(404);
    });
  });

  describe("DELETE /posts", () => {
    it("should delete a post successfully", async () => {
      const { _id: id } = await createPost(token);

      await request
        .delete(`${endpoint}/${id}`)
        .set("Authorization", token)
        .expect(200);
    });

    it("should return 404 if the try to delete a post that belong to another author", async () => {
      const { _id: id } = await createPost(token2);

      await request
        .delete(`${endpoint}/${id}`)
        .set("Authorization", token)
        .expect(404);
    });
  });

  describe("GET /posts", () => {
    it("should get posts successfully", async () => {
      const resp = await request
        .get(endpoint)
        .set("Authorization", token)
        .expect(200);

      const { body } = resp;

      expect(body.posts.length > 0).toBeTruthy();
    });
  });

  async function createPost(token) {
    const resp = await request
      .post(endpoint)
      .send({
        name: "Hello Blog",
        content: "Lorem ipsum",
        status: "green",
      })
      .set("Authorization", token);

    return resp.body;
  }
});

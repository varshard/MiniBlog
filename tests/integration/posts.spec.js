const supertest = require("supertest");
const mongoose = require("mongoose");
const initServer = require("../../backend/server");

describe("posts", () => {
  const endpoint = "/posts";
  let server;
  let request;
  beforeAll(async () => {
    server = await initServer();
    request = supertest.agent(server);
  });

  afterAll(async () => {
    await mongoose.connection.collections["Post"].drop();
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
        .set("Authorization", "Zm9vYmFy")
        .expect(200);

      const { body } = resp;
      expect(body.name).toBe("Hello Blog");
      expect(body.content).toBe("Lorem ipsum");
      expect(body.status).toBe("green");
      expect(body.author).toBe("foobar");
    });

    it("should return 403 if authorization header is missing", async () => {
      await request.post(endpoint).send({}).expect(403);
    });
  });

  describe("PATCH /posts", () => {
    it("should update a post successfully", async () => {
      const { _id: id } = await createPost();

      const resp = await request
        .patch(`${endpoint}/${id}`)
        .set("Authorization", "Zm9vYmFy")
        .send({
          content: "dolor sit amet",
          author: "farboo",
        })
        .expect(200);

      const { body } = resp;
      expect(body.content).toBe("dolor sit amet");
      expect(body.name).toBe("Hello Blog");
      expect(body.status).toBe("green");
      expect(body.author).toBe("foobar");
    });

    it("should return 404 if the try to update a post that belong to another author", async () => {
      const { _id: id } = await createPost();

      await request
        .patch(`${endpoint}/${id}`)
        .send({
          content: "dolor sit amet",
        })
        .set("Authorization", "ZmFyYm9vCg")
        .expect(404);
    });
  });

  describe("DELETE /posts", () => {
    it("should delete a post successfully", async () => {
      const { _id: id } = await createPost();

      await request
        .delete(`${endpoint}/${id}`)
        .set("Authorization", "Zm9vYmFy")
        .expect(200);
    });

    it("should return 404 if the try to delete a post that belong to another author", async () => {
      const { _id: id } = await createPost();

      await request
        .delete(`${endpoint}/${id}`)
        .set("Authorization", "ZmFyYm9vCg")
        .expect(404);
    });
  });

  describe("GET /posts", () => {
    it("should get posts successfully", async () => {
      const resp = await request
        .get(endpoint)
        .set("Authorization", "Zm9vYmFy")
        .expect(200);

      const { body } = resp;

      expect(body.posts.length > 0).toBeTruthy();
    });
  });

  async function createPost() {
    const resp = await request
      .post(endpoint)
      .send({
        name: "Hello Blog",
        content: "Lorem ipsum",
        status: "green",
      })
      .set("Authorization", "Zm9vYmFy");

    return resp.body;
  }
});

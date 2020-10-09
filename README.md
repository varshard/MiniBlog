# MiniBlog

This project built on Nextjs, Expressjs and MongoDB.

## Running

### Docker

This project come with Dockerfile and docker-compose. The easiest way to run it would be 
1. Executing`docker-compose up`
1. Visit localhost:3000

### From source

#### Development

1. Set variable `DB_URL` to point to a MongoDB.
1. Execute `npm start`

#### Deployment

1. Execute `npm run build` to build NextJS files.
1. Execute `npm start`

## Usage

### Authentication

MiniBlog is using a very basic authentication, by creating a base64 of an entered username from the home page.
Then this base64 will be used as Authorization header for each request to /posts endpoints.
This base64 will be set to localstorage as `token`.

### CRUDs

* GET /posts

For retrieving posts. If an authroization header present, it will detect use the token to mark a post that's belong to the author as editable.

* POST /posts

For creating a new post. It accept a JSON of name, context, category, and status.

* DELETE /posts/:id

For deleting a post.

* PATCH /posts/:id

For updating a post.

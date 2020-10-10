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
1. Set variable `SECRET` to a secret of choice. This value is used to generate a random password.
1. Execute `npm start`

#### Deployment

1. Execute `npm run build` to build NextJS files.
1. Execute `npm start`

## Usage

### Authentication

MiniBlog is using a very basic authentication. It uses basis authentication by retrieving username and password, then generate a random key with PBKDF2 using the provided username as salt.
The generated key will be used as Authorization header for each request to the /posts endpoints.
This generated key will be set to localstorage as `token`.

### Endpoints

* POST /register

For registering a new user.

* POST /login

For logging in with a registered credential.

* GET /posts

For retrieving posts. If an Authorization header present, it will detect use the token to mark a post that's belong to the author as editable.

* POST /posts

For creating a new post. It accepts a JSON of name, context, category, and status.

* DELETE /posts/:id

For deleting a post.

* PATCH /posts/:id

For updating a post.

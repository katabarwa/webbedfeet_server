# WEBBED FEET SERVER

A server for webbed feet app frontend.

Major Tech stack:

- `Node`
- `Express`
- `Typescript`
- `MongoDB/Mongoose`

## Depends on the following services

## Impacts the following collection in the DB

- [Users Collection]()
- [Talk Show Collection]()

## Environment Variables

###### Environment

- NODE_ENV - `either of "development, staging or production"`

###### Mongo

- MONGO_URI - `mongoDB connection string`

###### Cryptr

- CRYPTR_SECRET_KEY - `Cryptr secret`

## Available Scripts

### In Development

In the project directory, you can run:

#### 1. `npm install`

Install all NPM dependencies

#### 2. `npm run dev`

Runs the server in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to see if the server is up and running.

The server will automatically restart if you make edits, this done using the [nodemon npm package](https://www.npmjs.com/package/nodemon).\
You will also see `Webbed Feet server is up and running!` in the console if server started successfully and lint errors in the console if any errors.

### In Production

In the project directory, you can run:

#### `npm start`

Runs the server in the production mode.

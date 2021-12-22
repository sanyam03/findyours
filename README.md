<h1 align="center">
🌐 MERN Stack
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>

<p align="center">
   <a href="https://travis-ci.com/amazingandyyy/mern">
      <img src="https://travis-ci.com/amazingandyyy/mern.svg?branch=master" />
   </a>
   <a href="https://github.com/amazingandyyy/mern/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <a href="https://circleci.com/gh/amazingandyyy/mern">
      <img src="https://circleci.com/gh/amazingandyyy/mern.svg?style=svg" />
   </a>
</p>

> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

## clone or download
```terminal
$ git clone https://github.com/sanyam03/fingyours.git
$ npm i
```

## project structure
```terminal
LICENSE
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other
also, you need to create a .env file similar to the one shown in env.example.

## Client-side usage(PORT: 3030)

Note for windows: change line 30 in client/package.json to `"start": "set PORT=3030 &&  react-scripts start",`.

```terminal
$ cd findyours/client   // go to client folder
$ npm i       // npm install packages
$ npm start // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 5000)

### Prepare your secret

run the script at the first level:

(You need to add a JWT_SECRET in .env to connect to MongoDB)

```terminal
// in the root level
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> ./server/src/.env
```

### Start

```terminal
$ cd findyours   // go to project folder
$ npm i       // npm install packages
$ npm run dev // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
```

# Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
axios: ^0.21.0 | bycrpytjs: ^2.4.3
css-normalize: 0.0.1 | bootstrap: ^5.1.3
date-fns: ^2.16.1 | cors: ^2.8.5
dotenv: ^8.2.0 | dotenv: ^10.0.0
formik: ^2.2.5 | express: ^4.17.1
jquery: ^3.6.0 | jquery: ^3.6.0
react: ^16.0.0 | jsdom: ^19.0.0
react-dom: ^17.0.1 | jsonwebtoken: ^8.5.1
react-facebook-login: ^4.1.1 | mongoose: ^6.0.14
react-router-dom: ^5.2.0 | multer: ^1.4.4
react-scripts: 4.0.1 | react-validation: ^3.0.7
typescript: ^4.5.4 | validator: ^13.7.0
web-vitals: ^0.2.4 |
yup: ^0.31.1 |

## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## BUGs or comments

Email Me: sanyambharani01@gmail.com

## Authors
Sanyam Bharani, Sumeet, Sai

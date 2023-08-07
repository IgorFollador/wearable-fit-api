# REST API WEARABLE FIT

> REST API for connecting, processing and controlling the Wearable FIT System

## 💻 Requirements

First, verify if you have:

* Install `Node@16.15.0` or latest;
* MySQL  `MySQL@8.0` or latest.

## 🚀 Install Package

To install, follow these steps:

```
npm install
```

The commands below refer to database creation, migration and population, respectively:

```
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

## ☕ How to start the server

After reviewing the environment variables file `.env` is correct, just run:
> NOTE: the `.env.example` file can be used as a template for configuration.

```javascript
npm start
//or
npm run dev
//or
npm run test
```

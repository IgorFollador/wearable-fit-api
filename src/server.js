require('dotenv').config()
const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 8000;

routes(app, express);

app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
})

module.exports = app;
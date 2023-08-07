const cors = require('cors');

module.exports = (app, express) => {
    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))

    app.get('/', (req, res) => res.send('Welcome to API Wearable FIT'));
}
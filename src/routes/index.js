const cors = require('cors');
const v1 = require('./v1');

module.exports = (app, express) => {
    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))

    app.get('/', (req, res) => res.send('Welcome to API Wearable FIT'));

    app.use('/v1', v1);
}
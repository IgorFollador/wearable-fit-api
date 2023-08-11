const cors = require('cors');
const jwt = require('jsonwebtoken');
const publicRouter = require('./publicRoutes');
const usersRouter = require('./usersRoute');

module.exports = (app, express) => {
    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))

    app.get('/', (req, res) => res.send('Welcome to API Wearable FIT'));

    app.use(publicRouter);

    //Authenticate Routes
    app.use((req, res, next) => {
        let token = req.headers.authorization;
        if (!token) return res.sendStatus(401);
        token = token.replace('Bearer ', '');
        
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if(err) return res.sendStatus(401);
            req.userId = payload.userId;
            next();
        })
    })

    app.use(usersRouter);
    
}
require('dotenv').config();
const database = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class AuthenticationController {

    static async authorize (req, res, next) {
        let token = req.headers.authorization;
        if (!token) return res.sendStatus(401);
        token = token.replace('Bearer ', '');
        
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if(err) return res.sendStatus(401);
            req.userId = payload.userId;
            next();
        })
    }

    static async authenticate(req, res) {
        try {
            const selectedUser = await database.User.findOne({ where: { email: req.body.email } });
            if (!selectedUser) return res.status(401).json({ message: 'Incorrect Email or Password' });
            
            const passwordIsValid = bcrypt.compareSync(req.body.password, selectedUser.password);
            if (!passwordIsValid) return res.status(401).json({ message: 'Incorrect Email or Password' });

            const secretJwt = process.env.JWT_SECRET;
            const expiresIn = process.env.JWT_EXPIRES_IN;
            const token = jwt.sign({userId: selectedUser.id}, secretJwt, {expiresIn});

            const dataDTO = {
                token: token,
                userName: `${selectedUser.firstName} ${selectedUser.lastName}`,
                isProfessional: selectedUser.isProfessional 
            };

            return res.status(200).json(dataDTO);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async callbackGoogle(req, res) {
        try {
            return res.status(200).json({ message: 'Success!'});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = AuthenticationController;
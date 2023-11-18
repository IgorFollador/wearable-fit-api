require('dotenv').config();
const database = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const GoogleFitApi = require('../services/GoogleFitApi');
const Dates = require('../services/Dates');
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
                email: selectedUser.email,
                isProfessional: selectedUser.isProfessional 
            };

            return res.status(200).json(dataDTO);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async authorizateGoogleUser(req, res) {
        try {
            const authUrl = await (new GoogleFitApi()).getAuthUrl();
            return res.status(200).json({url: authUrl});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async authCallback(req, res) {
        try {
            const googleFitApi = new GoogleFitApi();
            const authorizationCode = req.query.code;
            
            console.log(req.userId, authorizationCode);
            
            const tokens = await googleFitApi.getToken(authorizationCode)
            googleFitApi.setTokens({
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token
            });


            // Save tokens into database
            const googleUser = await database.GoogleUser.create({
                userId: req.userId,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                scope: tokens.scope,
                tokentType: tokens.token_type,
                expiryDate: Dates.formatTimestampForMySQL(tokens.expiry_date)
            });

            return res.status(200).json(googleUser);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = AuthenticationController;
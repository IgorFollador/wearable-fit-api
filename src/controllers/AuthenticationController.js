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
            const host = req.query.host || null;
            console.log(host)
            const authUrl = await (new GoogleFitApi()).getAuthUrl(host);
            return res.status(200).json({url: authUrl});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getGoogleTokens(req, res) {
        try {
            const authorizationCode = req.query.code;
            const host = req.query.host || null;
            const userId = req.userId;
            if (authorizationCode === null) return res.status(404).json({ message: "Code is required." });
            
            const googleFitApi = new GoogleFitApi(host);
            const tokens = await googleFitApi.getToken(authorizationCode);

            const selectedGoogleUser = await database.GoogleUser.findOne({where: { userId: userId }});

            const tokensForm = {
                userId: userId,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                scope: tokens.scope,
                tokentType: tokens.token_type,
                expiryDate: Dates.formatTimestampForMySQL(tokens.expiry_date)
            }

            if (selectedGoogleUser) {
                await database.GoogleUser.update(tokensForm, {
                    where: {
                        id: Number(notificationId)
                    }
                })
            } else {
                // Save tokens into database
                await database.GoogleUser.create(tokensForm);
            }

            return res.status(200).json({ message: "Tokens saved, user authorized!"});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = AuthenticationController;
const database = require('../models');
const GoogleFitApi = require('../services/GoogleFitApi');

class HealthInformationController {

    static async readStepsByDate(req, res) {
        try {
            const userId = req.userId;
            const date = req.params.date;
            
            const userGoogleAccount = await database.GoogleUser.findOne({
                where: {
                    userId: userId
                }
            });
            if (userGoogleAccount === null) return res.status(404).json({ message: "The user is not connected to Google FIT" });

            const googleFitApi = new GoogleFitApi();

            googleFitApi.setTokens({
                accessToken: userGoogleAccount.accessToken,
                refreshToken: userGoogleAccount.refreshToken
            });

            const healthData = await googleFitApi.getDailyStepCount(new Date(date));

            return res.status(200).json(healthData);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async readCaloriesByDate(req, res) {
        try {
            const userId = req.userId;
            const date = req.params.date;

            const userGoogleAccount = await database.GoogleUser.findOne({
                where: {
                    userId: userId
                }
            });
            if (userGoogleAccount === null) return res.status(404).json({ message: "The user is not connected to Google FIT" });

            const googleFitApi = new GoogleFitApi();
            
            googleFitApi.setTokens({
                accessToken: userGoogleAccount.accessToken,
                refreshToken: userGoogleAccount.refreshToken
            });


            const healthData = await googleFitApi.getDailyCaloriesBurned(new Date(date));

            return res.status(200).json(healthData);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async readSleepByDate(req, res) {
        try {
            const userId = req.userId;
            const date = req.params.date;

            const userGoogleAccount = await database.GoogleUser.findOne({
                where: {
                    userId: userId
                }
            });
            if (userGoogleAccount === null) return res.status(404).json({ message: "The user is not connected to Google FIT" });

            const googleFitApi = new GoogleFitApi();
            
            googleFitApi.setTokens({
                accessToken: userGoogleAccount.accessToken,
                refreshToken: userGoogleAccount.refreshToken
            });

            const healthData = await googleFitApi.getDailySleepDuration(date);

            return res.status(200).json(healthData);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async readActivityByDate(req, res) {
        try {
            const userId = req.userId;
            const date = req.params.date;

            const userGoogleAccount = await database.GoogleUser.findOne({
                where: {
                    userId: userId
                }
            });
            if (userGoogleAccount === null) return res.status(404).json({ message: "The user is not connected to Google FIT" });

            const googleFitApi = new GoogleFitApi();
            
            googleFitApi.setTokens({
                accessToken: userGoogleAccount.accessToken,
                refreshToken: userGoogleAccount.refreshToken
            });

            const healthData = await googleFitApi.getDailyPhysicalActivityDuration(new Date(date));

            return res.status(200).json(healthData);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async readHeartRateByDate(req, res) {
        try {
            const userId = req.userId;
            const date = req.params.date;

            const userGoogleAccount = await database.GoogleUser.findOne({
                where: {
                    userId: userId
                }
            });
            if (userGoogleAccount === null) return res.status(404).json({ message: "The user is not connected to Google FIT" });

            const googleFitApi = new GoogleFitApi();
            
            googleFitApi.setTokens({
                accessToken: userGoogleAccount.accessToken,
                refreshToken: userGoogleAccount.refreshToken
            });

            const healthData = await googleFitApi.getDailyHeartRate(new Date(date));

            return res.status(200).json(healthData);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // TODO: blood-preassure, blood-glucose, body-temperature

}

module.exports = HealthInformationController;
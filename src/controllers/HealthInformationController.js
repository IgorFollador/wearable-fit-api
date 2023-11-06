const database = require('../models');
const GoogleFitApi = require('../services/GoogleFitApi');

class HealthInformationController {
    static async readWeaklyHealthDataByUserId(req, res) {
        try {
            const userId = req.userId;
            const googleFitApi = new GoogleFitApi();
            
            const userGoogleAccount = await database.GoogleUser.findOne({
                where: {
                    userId: userId
                }
            });
            if (userGoogleAccount === null) return res.status(404).json({ message: "The user is not connected to Google FIT" });

            googleFitApi.setTokens({
                accessToken: userGoogleAccount.accessToken,
                refreshToken: userGoogleAccount.refreshToken
            });

            const startDate = new Date('2023-08-01');
            const endDate = new Date('2023-08-07');
            const fitnessData = await googleFitApi.getHealthSummaryByDay(startDate, endDate);

            return res.status(200).json(fitnessData);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = HealthInformationController;
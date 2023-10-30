const { google } = require('googleapis');

class GoogleFitApi {
    constructor() {
        this.user = google.user('v1');
        this.fitness = google.fitness('v1');

        this.oAuthClient = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            `${process.env.HOST}/google/authCallback`
        );

        this.scopes = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/openid',
            'https://www.googleapis.com/auth/fitness.activity.read',
            'https://www.googleapis.com/auth/fitness.activity.write',
            'https://www.googleapis.com/auth/fitness.blood_glucose.read',
            'https://www.googleapis.com/auth/fitness.blood_glucose.write',
            'https://www.googleapis.com/auth/fitness.blood_pressure.read',
            'https://www.googleapis.com/auth/fitness.blood_pressure.write',
            'https://www.googleapis.com/auth/fitness.body.read',
            'https://www.googleapis.com/auth/fitness.body.write',
            'https://www.googleapis.com/auth/fitness.body_temperature.read',
            'https://www.googleapis.com/auth/fitness.body_temperature.write',
            'https://www.googleapis.com/auth/fitness.heart_rate.read',
            'https://www.googleapis.com/auth/fitness.heart_rate.write',
            'https://www.googleapis.com/auth/fitness.location.read',
            'https://www.googleapis.com/auth/fitness.location.write',
            'https://www.googleapis.com/auth/fitness.nutrition.read',
            'https://www.googleapis.com/auth/fitness.nutrition.write',
            'https://www.googleapis.com/auth/fitness.oxygen_saturation.read',
            'https://www.googleapis.com/auth/fitness.oxygen_saturation.write',
            'https://www.googleapis.com/auth/fitness.reproductive_health.read',
            'https://www.googleapis.com/auth/fitness.reproductive_health.write',
            'https://www.googleapis.com/auth/fitness.sleep.read',
            'https://www.googleapis.com/auth/fitness.sleep.write'
        ];
    }

    setTokens(tokens) {
        this.oAuthClient.setCredentials({
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
        });
    }

    async getAuthUrl() {
        return this.oAuthClient.generateAuthUrl({
            access_type: 'offline',
            scope: this.scopes,
        });
    }

    async getToken(code) {
        const { tokens } = await this.oAuthClient.getToken(code);
        this.oAuthClient.setCredentials(tokens);
        return tokens;
    }

    async getUserData() {
        const response = await this.fitness.users.dataSources.list({
            userId: 'me',
            auth: this.oAuthClient
        });

        return response.data;
    }

    async getFitnessData() {
        const response = await this.fitness.users.dataSources.list({
            userId: 'me',
            auth: this.oAuthClient
        });

        return response.data;
    }

    async getFitnessDataByDataSourceId(dataSourceId) {
        const response = await this.fitness.users.dataSources.get({
            userId: 'me',
            dataSourceId: dataSourceId,
            auth: this.oAuthClient
        });

        return response;
    }
}

module.exports = GoogleFitApi;
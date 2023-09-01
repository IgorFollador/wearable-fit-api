const { google } = require('googleapis');

class GoogleFitApi {
    constructor() {
        this.oAuthClient = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            'http://localhost:8000/google/auth'
        );

        this.scopes = [
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

    async authenticate() {
        const authorizeUrl = this.oAuthClient.generateAuthUrl({
            access_type: 'offline',
            scope: this.scopes,
        });

        return authorizeUrl;
    }

    async getToken(code) {
        const { tokens } = await this.oAuthClient.getToken(code);
        this.oAuthClient.setCredentials(tokens);
    }

    async getFitnessData() {
        const fitness = google.fitness('v1');
        const response = await fitness.users.dataSources.list({
            userId: 'me',
        });

        return response.data;
    }
}
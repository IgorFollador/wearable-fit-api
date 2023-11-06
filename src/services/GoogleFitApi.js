const { google } = require('googleapis');

class GoogleFitApi {
    constructor() {
        this.fitness = google.fitness('v1');

        this.oAuthClient = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            `${process.env.HOST}/google/authCallback`
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

    setTokens(tokens) {
        this.oAuthClient.setCredentials({
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
        });
    }

    async getAuthUrl() {
        return this.oAuthClient.generateAuthUrl({
            access_type: 'offline',
            scope: this.scopes
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

    async fetchDataByDataType(dataTypeName, date) {
        // Ajuste a data para o início do dia.
        date.setHours(0, 0, 0, 0);

        const request = {
            userId: 'me',
            auth: this.oAuthClient,
            resource: {
                aggregateBy: [{ dataTypeName }],
                bucketByTime: { durationMillis: 86400000 }, // Agrupe por dia (24 horas)
                startTimeMillis: date.getTime(),
                endTimeMillis: date.getTime() + 86400000 // Fim do mesmo dia
            }
        };

        try {
            const response = await this.fitness.users.dataset.aggregate(request);
            if (response.data && response.data.bucket && response.data.bucket.length > 0) {
                const data = response.data.bucket[0].dataset[0];
                if (data && data.point && data.point.length > 0) {
                    return data.point;
                }
            }
            return [];
        } catch (error) {
            console.error(`Erro ao recuperar dados de ${dataTypeName}:`, error);
            throw error;
        }
    }

    async getDailyStepCount(date) {
        const dataTypeName = 'com.google.step_count.delta';
        const dataPoints = await this.fetchDataByDataType(dataTypeName, date);
        return dataPoints.reduce((total, point) => total + point.value[0].intVal, 0);
    }

    async getDailyCaloriesBurned(date) {
        const dataTypeName = 'com.google.calories.expended';
        const dataPoints = await this.fetchDataByDataType(dataTypeName, date);
        return dataPoints.reduce((total, point) => total + point.value[0].fpVal, 0);
    }

    async getDailySleepDuration(date) {
        const dataTypeName = 'com.google.activity.segment';
        const dataPoints = await this.fetchDataByDataType(dataTypeName, date);
        let totalSleepDuration = 0;

        for (const point of dataPoints) {
            if (point.value[0].intVal === 72) {
                totalSleepDuration += point.endTimeNanos - point.startTimeNanos;
            }
        }

        // Converta a duração do sono para horas.
        const hours = totalSleepDuration / (1000 * 60 * 60);
        return hours;
    }

    async getDailyPhysicalActivityDuration(date) {
        const dataTypeName = 'com.google.activity.segment';
        const dataPoints = await this.fetchDataByDataType(dataTypeName, date);
        let totalActivityDuration = 0;

        for (const point of dataPoints) {
            if (point.value[0].intVal === 7) {
                totalActivityDuration += point.endTimeNanos - point.startTimeNanos;
            }
        }

        // Converta a duração da atividade física para minutos.
        const minutes = totalActivityDuration / (1000 * 60);
        return minutes;
    }

    async getDailyHeartRate(date) {
        const dataTypeName = 'com.google.heart_rate.bpm';
        const dataPoints = await this.fetchDataByDataType(dataTypeName, date);
        return dataPoints.map(point => ({
            timestamp: new Date(point.startTimeNanos / 1000000),
            heartRate: point.value[0].fpVal,
        }));
    }

    async getDailyBloodPressure(date) {
        const dataTypeName = 'com.google.blood_pressure';
        const dataPoints = await this.fetchDataByDataType(dataTypeName, date);
        return dataPoints.map(point => ({
            timestamp: new Date(point.startTimeNanos / 1000000),
            systolic: point.value[0].fpVal,
            diastolic: point.value[1].fpVal,
        }));
    }

    async getDailyBloodGlucose(date) {
        const dataTypeName = 'com.google.blood_glucose';
        const dataPoints = await this.fetchDataByDataType(dataTypeName, date);
        return dataPoints.map(point => ({
            timestamp: new Date(point.startTimeNanos / 1000000),
            glucoseLevel: point.value[0].fpVal,
        }));
    }

    async getDailyBodyTemperature(date) {
        const dataTypeName = 'com.google.body.temperature';
        const dataPoints = await this.fetchDataByDataType(dataTypeName, date);
        return dataPoints.map(point => ({
            timestamp: new Date(point.startTimeNanos / 1000000),
            bodyTemperature: point.value[0].fpVal,
        }));
    }

    async getDailyOxygenSaturation(date) {
        const dataTypeName = 'com.google.oxygen_saturation';
        const dataPoints = await this.fetchDataByDataType(dataTypeName, date);
        return dataPoints.map(point => ({
            timestamp: new Date(point.startTimeNanos / 1000000),
            oxygenSaturation: point.value[0].fpVal,
        }));
    }

    async getHealthSummaryByDay(startDate, endDate) {
        const healthSummaryByDay = [];
    
        const currentDate = new Date(startDate);
    
        while (currentDate <= endDate) {
            const date = new Date(currentDate);
            const dailySummary = {
                date: date,
                stepCount: await this.getDailyStepCount(date),
                caloriesBurned: await this.getDailyCaloriesBurned(date),
                sleepDuration: await this.getDailySleepDuration(date),
                physicalActivityDuration: await this.getDailyPhysicalActivityDuration(date),
                heartRate: await this.getDailyHeartRate(date)
            };
    
            healthSummaryByDay.push(dailySummary);
    
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return healthSummaryByDay;
    }
}

module.exports = GoogleFitApi;
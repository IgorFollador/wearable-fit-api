const { google } = require('googleapis');

class GoogleFitApi {
    constructor(redirectUrl = `${process.env.HOST}/google/authCallback`) {
        this.fitness = google.fitness('v1');

        this.oAuthClient = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
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
                bucketByTime: { durationMillis: 1800000 }, // Agrupe por 30 minutos
                startTimeMillis: date.getTime(),
                endTimeMillis: date.getTime() + 86400000 // Fim do mesmo dia
            }
        };
    
        try {
            const response = await this.fitness.users.dataset.aggregate(request);
            const dataPoints = [];
    
            if (response.data && response.data.bucket) {
                response.data.bucket.forEach(bucket => {
                    if (bucket.dataset[0].point) {
                        bucket.dataset[0].point.forEach(point => {
                            dataPoints.push(point);
                        });
                    }
                });
            }
    
            return dataPoints;
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

    // TODO: Rever retorno
    async getDailySleepDuration(date) {
        const localDate = new Date(date);
        localDate.setHours(0, 0, 0, 0);

        // Início do intervalo de sono (18h do dia anterior)
        const startDateTime = new Date(localDate);
        startDateTime.setHours(-6, 0, 0, 0); // Retrocede 6 horas

        // Fim do intervalo de sono (18h do dia solicitado)
        const endDateTime = new Date(localDate);
        endDateTime.setHours(18, 0, 0, 0); // Avança para 18h

        const request = {
            userId: 'me',
            auth: this.oAuthClient,
            resource: {
                aggregateBy: [{ dataTypeName: 'com.google.activity.segment' }],
                bucketByTime: { durationMillis: 86400000 }, // Agrupe por 24 horas
                startTimeMillis: startDateTime.getTime(),
                endTimeMillis: endDateTime.getTime()
            }
        };

        try {
            const response = await this.fitness.users.dataset.aggregate(request);
            let totalSleepDuration = 0;
    
            if (response.data && response.data.bucket && response.data.bucket.length > 0) {
                const sleepDataPoints = response.data.bucket[0].dataset[0].point;
                sleepDataPoints.forEach((point) => {

                    // Procurando por códigos de atividade de sono (72 ou 109)
                    if (point.value.some(val => val.intVal === 72 || val.intVal === 109)) {
                        totalSleepDuration += (point.endTimeNanos - point.startTimeNanos) / (1e9 * 3600); // Convertendo de nanossegundos para horas
                    }
                });
            }
            return totalSleepDuration;
        } catch (error) {
            console.error(`Erro ao recuperar dados de sono:`, error);
            throw error;
        }
    }

    async getDailyPhysicalActivityDuration(date) {
        const dataTypeName = 'com.google.activity.segment';
        const dataPoints = await this.fetchDataByDataType(dataTypeName, date);
        let activities = {};

        for (const point of dataPoints) {
            const activityType = point.value[0].intVal;
            const duration = (point.endTimeNanos - point.startTimeNanos)  / 1e9 / 60; // Convertendo para minutos

            if (activities[activityType]) {
                activities[activityType].duration += duration;
            } else {
                activities[activityType] = { duration, name: this.getActivityName(activityType) };
            }
        }

        return activities;
    }

    async getDailyHeartRate(date) {
        const dataTypeName = 'com.google.heart_rate.bpm';
        const dataPoints = await this.fetchDataByDataType(dataTypeName, date);
        
        const heartRates = {};
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeKey = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                heartRates[timeKey] = [];
            }
        }
        
        dataPoints.forEach(point => {
            const timestamp = new Date(point.startTimeNanos / 1000000);
            const hour = timestamp.getHours();
            const minute = timestamp.getMinutes() - (timestamp.getMinutes() % 30);
            const timeKey = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            heartRates[timeKey].push(point.value[0].fpVal);
        });
        
        // Calcular a média de frequência cardíaca para cada intervalo
        Object.keys(heartRates).forEach(timeKey => {
            const rates = heartRates[timeKey];
            if (rates.length > 0) {
                const averageRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
                heartRates[timeKey] = Math.round(averageRate); // Arredondando o valor
            } else {
                delete heartRates[timeKey]; // Removendo intervalos sem dados
            }
        });
        
        return heartRates;
    }

    getActivityName(activityType) {
        const activityMap = {
          0: 'No atividade',
          1: 'Andar de bicicleta',
          2: 'Andar',
          3: 'Parado (não se movendo)',
          4: 'Desconhecido (não foi possível detectar atividade)',
          7: 'Caminhada',
          8: 'Corrida',
          9: 'Aeróbica',
          10: 'Badminton',
          11: 'Beisebol',
          12: 'Basquete',
          13: 'Biatlo',
          14: 'Handebol',
          15: 'Pilates',
          16: 'Esqui cross-country',
          17: 'Curling',
          18: 'Dança',
          19: 'Esgrima',
          20: 'Futebol Americano',
          21: 'Frisbee',
          22: 'Jardinagem',
          23: 'Golfe',
          24: 'Ginástica',
          25: 'Escalada em rocha',
          26: 'Hóquei',
          27: 'Equitação',
          28: 'Artes marciais',
          29: 'Meditação',
          30: 'Artes marciais mistas',
          31: 'Pular corda',
          32: 'Remo',
          33: 'Rugby',
          34: 'Jogging',
          35: 'Natação',
          36: 'Tênis de mesa',
          37: 'Tênis',
          38: 'Treinamento de força',
          39: 'Esqui',
          40: 'Snowboard',
          41: 'Squash',
          42: 'Stair climbing',
          43: 'Stand-up paddleboarding',
          44: 'Surf',
          45: 'Natação sincronizada',
          46: 'Tae kwon do',
          47: 'Tai chi',
          48: 'Futebol',
          49: 'Voleibol',
          50: 'Polo aquático',
          51: 'Weightlifting',
          52: 'Yoga',
          53: 'Zumba',
          /// 
        };
      
        return activityMap[activityType] || 'Outra Atividade';
      }
}

module.exports = GoogleFitApi;
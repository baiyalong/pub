/**
 * Created by bai on 2015/9/1.
 */
Content = new Mongo.Collection('content');

Content.attachSchema(new SimpleSchema({
    timestamp: {
        type: Date
    },
    pointCode: {
        type: Number
    },
    pointName: {
        type: String
    },
    cityCode: {
        type: Number
    },
    cityName: {
        type: String
    },
    pollutantConcentration: {
        type: new SimpleSchema({
            "PM2.5": {
                type: Number,
                min: 0
            },
            PM10: {
                type: Number,
                min: 0
            },
            O3: {
                type: Number,
                min: 0
            },
            SO2: {
                type: Number,
                min: 0
            },
            NO2: {
                type: Number,
                min: 0
            },
            CO: {
                type: Number,
                min: 0
            },
            AQI: {
                type: Number,
                min: 0
            }
        })
    },
    airQuality: {
        type: new SimpleSchema({

        })
    }

}));
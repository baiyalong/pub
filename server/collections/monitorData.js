/**
 * Created by bai on 2015/9/1.
 */


MonitorData.attachSchema(new SimpleSchema({
    timestamp: {
        type: Date
    },
    positionCode: {
        type: String
    },
    stationCode: {
        type: String
    },
    pollutant: {
        type: [Object]
    },
    'pollutant.$.code': {
        type: Number
    },
    'pollutant.$.value': {
        type: Number,
        min: 0
    },
    AQI: {
        type: Number
    },
    primaryPollutant: {
        type: String
    },


    type: {
        // hour or day
        type: String
    }
}));
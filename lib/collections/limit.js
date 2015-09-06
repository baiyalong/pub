/**
 * Created by bai on 2015/9/1.
 */
Limit = new Mongo.Collection('limit');

Limit.attachSchema(new SimpleSchema({
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
    }
}));
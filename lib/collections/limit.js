/**
 * Created by bai on 2015/9/1.
 */
Limit = new Mongo.Collection('limit');

Limit.attachSchema(new SimpleSchema({
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
}));
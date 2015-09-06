/**
 * Created by bai on 2015/9/6.
 */
Pollutant = new Mongo.Collection('pollutant');

Pollutant.attachSchema(new SimpleSchema({
    pollutantCode: {
        type: Number
    },
    pollutantName: {
        type: String
    },
    chineseName: {
        type: String
    },
    unit: {
        type: String
    }
}));
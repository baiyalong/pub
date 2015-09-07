/**
 * Created by bai on 2015/9/1.
 */
Point = new Mongo.Collection('point');

Point.attachSchema(new SimpleSchema({
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
    enableStatus: {
        type: Boolean
    },
    publishStatus: {
        type: Boolean
    }
}));
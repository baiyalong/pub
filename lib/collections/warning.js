/**
 * Created by bai on 2015/9/1.
 */
Warning = new Mongo.Collection('warning');

Warning.attachSchema(new SimpleSchema({
    content: {
        type: String
    },
    timestamp: {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    },
    cityCode: {
        type: Number
    },
    cityName: {
        type: String
    }
}));
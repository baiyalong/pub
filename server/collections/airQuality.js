/**
 * Created by bai on 2015/10/13.
 */

AirQuality.attachSchema(new SimpleSchema({
    date: {
        type: Date
    },
    cityCode: {
        type: Number
    },
    cityName: {
        type: String
    },
    countyCode: {
        type: Number
    },
    countyName: {
        type: String
    },
    content: {
        type: String
    },
    statusCode: {
        type: Number
    },
    statusName: {
        type: String
    },
    userId: {
        type: String
    },
    userName: {
        type: String
    },
    timestamp: {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    }
}));

AirQuality.allow({
        insert: function () {
            return true
        },
        update: function () {
            return true
        },
        remove: function () {
            return true;
        }
    }
)

Meteor.publish('airQuality', function () {
    return AirQuality.find();
})

/**
 * Created by bai on 2015/11/27.
 */
/**
 * Created by bai on 2015/9/1.
 */


StationHourlyCorrection.attachSchema(new SimpleSchema({
    "value": {type: Number, decimal: true, min: 0},
    "monitorTime": {type: Date},
    "stationCode": {type: Number},
    "timestamp": {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    },

}));

StationHourlyCorrection.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
})


Meteor.publish('stationHourlyCorrection', function (station, date) {
    //console.log(station, date)
    function tz(d) {
        var d = new Date(d);
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        return d;
    }

    function nd(d) {
        var d = new Date(d);
        d.setDate(d.getDate() + 1)
        return d;
    }

    if (station && date && !isNaN(Number(station) && !isNaN(new Date(date))))
        return StationHourlyCorrection.find({$and: [{stationCode: Number(station)}, {monitorTime: {$gte: tz(date)}}, {monitorTime: {$lt: nd(tz(date))}}]}, {
                sort: {monitorTime: 1}
            }
        )
})
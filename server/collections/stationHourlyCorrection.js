/**
 * Created by bai on 2015/11/27.
 */
/**
 * Created by bai on 2015/9/1.
 */


StationHourlyCorrection.attachSchema(new SimpleSchema({
    "PKID": {type: String},
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

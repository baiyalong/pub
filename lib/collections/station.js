/**
 * Created by bai on 2015/9/1.
 */
Station = new Mongo.Collection('station');

Station.attachSchema(new SimpleSchema({
    "StationId": {type: Number},
    "PositionName": {type: String},
    "Area": {type: String},
    "UniqueCode": {type: Number},
    "StationCode": {type: String},
    "StationPic": {type: Number},
    "Longitude": {type: Number, decimal: true},
    "Latitude": {type: Number, decimal: true},
    "Address": {type: Number},
    "PollutantCodes": {type: String},
    "StationTypeId": {type: Number},
    "Status": {type: Number},
    "BuildDate": {type: String},
    "Phone": {type: Number},
    "Manager": {type: Number},
    "Description": {type: String},
    "IsMonitor": {type: Number},
    "IsContrast": {type: Number},
    enableStatus: {
        type: Boolean, autoValue: function () {
            return true;
        }
    },
    publishStatus: {
        type: Boolean, autoValue: function () {
            return true;
        }
    },
}));
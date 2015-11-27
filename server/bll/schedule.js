/////**
//// * Created by bai on 2015/8/20.
//// */
//////��ʱ����
////
////
////scheduleJobs.syncPollutantInfo = {
////    schedule: function (parser) {
////        //return parser.text('at 2:00 am');
////        return parser.text('every 30 s');
////    },
////    job: function () {
////    }
////}
////
////scheduleJobs.syncMonitorInfo = {
////    schedule: function (parser) {
////        return parser.text('at 3:00 am');
////    },
////    job: function () {
////    }
////}
////
////scheduleJobs.syncCityPollutantDaily = {
////    schedule: function (parser) {
////        return parser.text('at 4:00 am');
////    },
////    job: function () {
////    }
////}
//
//scheduleJobs.syncMonitorPollutantHourly = {
//    schedule: function (parser) {
//        return parser.text('every 10 m');
//    },
//    job: function () {
//        var t = MonitorData.findOne({}, {sort: {timestamp: -1}}).timestamp;
//        StationHourlyRaw.find({MONITORTIME: {$gt: t}}).forEach(function (e) {
//            console.log(e)
//            MonitorData.upsert({timestamp: e.MONITORTIME, stationCode: parseInt(e.POINTCODE)}, {
//                $set: {
//                    timestamp: e.MONITORTIME,
//                    cityCode: parseInt(e.CODEREGION) / 1000000,
//                    stationCode: parseInt(e.POINTCODE),
//                    type: 'hour',
//                },
//                $setOnInsert: {
//                    pollutant: []
//                },
//                $addToSet: {
//                    pollutant: {
//                        code: (function (c) {
//                            if (c == 'AQI')
//                                return 90;
//                            else
//                                return parseInt(c)
//                        })(e.CODEPOLLUTE),
//                        value: (function (v) {
//                            if (v < 0)
//                                return 0;
//                            else
//                                return parseFloat(v)
//                        })(e.AVERVALUE)
//                    }
//                }
//            })
//        })
//
//    }
//}

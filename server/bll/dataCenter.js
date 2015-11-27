/**
 * Created by bai on 2015/9/7.
 */

Meteor.methods({
    dataSync: function (t1, t2) {
        function tz(t) {
            t = new Date(t);
            t.setHours(0);
            t.setMinutes(0);
            t.setSeconds(0);
            return t;
        }

        t1 = tz(t1);
        t2 = tz(t2);
        t2.setDate(t2.getDate() + 1);
        console.log('dataSync', t1, t2)
        //remove correction

        return StationHourlyCorrection.remove({$and: [{monitorTime: {$gte: t1}}, {monitorTime: {$lt: t2}}]})
    },
    'stationHourlyCorrection': function (condition) {
        if (!condition || !condition.date || !condition.station)
            return;
        var date = condition.date, station = condition.station;

        function tz(t) {
            t = new Date(t);
            t.setHours(0);
            t.setMinutes(0);
            t.setSeconds(0);
            return t;
        }

        var t1 = tz(date);
        var t2 = new Date(t1);
        t2.setDate(t2.getDate() + 1);

        var list = [];

        StationHourlyCorrection.find({$and: [{POINTCODE: station.toString()}, {MONITORTIME: {$gte: t1}}, {MONITORTIME: {$lt: t2}}]}, {
            sort: {POINTCODE: 1},
            fields: {
                PKID: 1,
                POINTCODE: 1,
                CODEPOLLUTE: 1,
                AVERVALUE: 1,
                MONITORTIME: 1
            }
        }).forEach(function (e) {
            var correction = StationHourlyCorrection.findOne({PKID: e.PKID});
            var index = list.findIndex(function (ee) {
                return ee.PKID == e.PKID
            })
            if (index == -1) {
                var line = {
                    PKID: e.PKID,
                    stationCode: e.POINTCODE,
                    monitorTime: e.MONITORTIME
                };
                line[e.CODEPOLLUTE] = correction ? correction.value : parseFloat(e.AVERVALUE)
                list.push(line)
            } else {
                list[index][e.CODEPOLLUTE] = correction ? correction.value : parseFloat(e.AVERVALUE)
            }
        })

        return list;
    }
})


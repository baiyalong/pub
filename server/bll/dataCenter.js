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
        var date = new Date(Number(condition.date)), station = Number(condition.station);

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

        StationHourlyRaw.find({$and: [{POINTCODE: station.toString()}, {MONITORTIME: {$gte: t1}}, {MONITORTIME: {$lt: t2}}]}, {
            sort: {MONITORTIME: 1},
            fields: {
                CODEPOLLUTE: 1,
                AVERVALUE: 1,
                MONITORTIME: 1
            }
        }).forEach(function (e) {
            var correction = StationHourlyCorrection.findOne({$and: [{stationCode: parseInt(station)}, {monitorTime: e.MONITORTIME}]});
            var index = list.findIndex(function (ee) {
                return ee.monitorTime.getTime() == e.MONITORTIME.getTime()
            })
            if (index == -1) {
                var line = {
                    stationCode: parseInt(station),
                    monitorTime: e.MONITORTIME
                };
                line[e.CODEPOLLUTE] = correction ? correction.value : parseFloat(e.AVERVALUE)
                list.push(line)
            } else {
                list[index][e.CODEPOLLUTE] = correction ? correction.value : parseFloat(e.AVERVALUE)
            }
        })
        console.log('stationHourlyCorrection method : ', condition, list)
        return list;
    }
})


Meteor.publish('stationHourlyRaw', function (station, date) {

    console.log(station, date, StationHourlyRaw.find({$and: [{POINTCODE: station.toString()}, {MONITORTIME: {$gte: tz(date)}}, {MONITORTIME: {$lt: nd(tz(date))}}]}, {
        sort: {MONITORTIME: 1},
        fields: {
            PKID: 1,
            CODEPOLLUTE: 1,
            AVERVALUE: 1,
            MONITORTIME: 1
        }
    }).fetch())

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
        return StationHourlyRaw.find({$and: [{POINTCODE: station.toString()}, {MONITORTIME: {$gte: tz(date)}}, {MONITORTIME: {$lt: nd(tz(date))}}]}, {
            sort: {MONITORTIME: 1},
            fields: {
                PKID: 1,
                CODEPOLLUTE: 1,
                AVERVALUE: 1,
                MONITORTIME: 1
            }
        })
})
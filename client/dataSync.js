/**
 * Created by bai on 2015/9/7.
 */

Template.dataSync.helpers({});

Template.dataSync.events({
    'click .sync': function (e, t) {
        e.preventDefault()
        var dateFrom = $('#dateFrom').datepicker('getDate')
        var dateTo = $('#dateTo').datepicker('getDate')
        //Util.modal('数据重新同步', '任务已提交给后台处理！')
        Meteor.call('dataSync', dateFrom, dateTo, function (err) {
            if (err) {
                Util.modal('数据重新同步', err.message)
                console.log(err)
            }
            else
                Util.modal('数据重新同步', '同步成功！')
        });
    },

});

Template.dataSync.onRendered(function () {

        $('#daterange').datepicker({
            language: "zh-CN"
        });

        $('#dateFrom').datepicker('setDate', new Date())
        $('#dateTo').datepicker('setDate', new Date())
        $('#dateFrom').datepicker('setStartDate', (function () {
            var d = new Date();
            d.setDate(d.getDate() - 60);
            return d;
        })())
        $('#dateTo').datepicker('setStartDate', (function () {
            var d = new Date();
            d.setDate(d.getDate() - 60);
            return d;
        })())
        $('#dateFrom').datepicker('setEndDate', new Date())
        $('#dateTo').datepicker('setEndDate', new Date())

    }
);

Template.dataSync.onCreated(function () {

    }
);
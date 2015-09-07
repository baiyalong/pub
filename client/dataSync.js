/**
 * Created by bai on 2015/9/7.
 */

Template.dataSync.helpers({});

Template.dataSync.events({
    'click .sync': function (e, t) {
        e.preventDefault()
        var t1 = $('#t1').val()
        var t2 = $('#t2').val()
        if (t1.trim() == '' || t2.trim() == '') {
            Util.modal('数据重新同步', '输入参数为空！')
            return;
        }
        Meteor.call('dataSync', t1, t2, function () {
            Util.modal('数据重新同步', '同步成功！')
        });
    },

});

Template.dataSync.onRendered(function () {

    }
);

Template.dataSync.onCreated(function () {

    }
);
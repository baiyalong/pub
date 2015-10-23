/**
 * Created by bai on 2015/10/13.
 */
/**
 * Created by bai on 2015/9/14.
 */

Template.airQualityReview.helpers({
    airQualityList: function () {
        var w = AirQuality.find({}, {sort: {timestamp: -1}}).fetch()
        w.forEach(function (e) {
            e.moment = moment(e.date).format('YYYY-MM-DD')
            e.statusColor = e.statusCode == 1 ? 'green' : e.statusCode == -1 ? 'red' : '';
        })
        return w;
    }
});

Template.airQualityReview.events({
    'click .pass': function () {
        AirQuality.update({_id: this._id}, {$set: {statusCode: 1, statusName: '审核通过'}}, function (err) {
            if (err)Util.modal('空气质量预报审核', err);
            else
                Util.modal('空气质量预报审核', '审核成功！');
        });
    },
    'click .back': function () {
        AirQuality.update({_id: this._id}, {$set: {statusCode: -1, statusName: '退回修改'}}, function (err) {
            if (err)Util.modal('空气质量预报审核', err);
            else
                Util.modal('空气质量预报审核', '审核成功！');
        });
    },
    'click .remove': function () {
        AirQuality.remove({_id: this._id}, function (err) {
            if (err)Util.modal('空气质量预报审核', err);
            else
                Util.modal('空气质量预报审核', '删除成功！');
        });
    },
    'mouseenter tbody>tr': function () {
        $('#' + this._id).css({
            'border': '2px solid #186E37',
            'border-width': '0 0 0 2px'
        })
    },
    'mouseleave tbody>tr': function () {
        $('#' + this._id).css({
            'border': '1px dashed #D8D8D8',
        })
    }
});

Template.airQualityReview.onRendered(function () {

    }
);

Template.airQualityReview.onCreated(function () {

})

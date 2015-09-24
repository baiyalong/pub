/**
 * Created by bai on 2015/9/7.
 */

Template.pollutantLimit.helpers({
    limitList: function () {
        var limit = limitArr
        var p = Pollutant.find({pollutantCode: {$in: limit}}, {
            fields: {
                pollutantCode: 1,
                pollutantName: 1,
                limit: 1
            }
        }).fetch()
        p.forEach(function (e) {
            e.index = limit.indexOf(e.pollutantCode)
        })
        return p.sort(function (a, b) {
            return a.index - b.index
        });
    }
});

Template.pollutantLimit.events({
    'click .save': function () {
        var limit = limitArr
        var arr = []
        limit.forEach(function (e) {
            var value = parseInt($('input[code="' + e + '"]').val().trim());
            if (isNaN(value)) return;
            var id = $('input[code="' + e + '"]').attr('id');
            arr.push({id: id, limit: value})
        })
        Meteor.call('limitUpdate', arr, function (err) {
            if (err)Util.modal('污染物排放发布限值', err)
            else {
                Util.modal('污染物排放发布限值', '修改成功！')
                $('input[type="number"]').each(function () {
                    $(this).val($(this).attr('history'))
                })
            }
        })
    },
    'click .cancel': function () {
        $('input[type="number"]').each(function () {
            $(this).val($(this).attr('history'))
        })
    },
    'mouseenter tbody>tr': function () {
        $('tbody>tr').css({
            'border': '2px solid #186E37',
            'border-width': '0 0 0 2px'
        })
    },
    'mouseleave tbody>tr': function () {
        $('tbody>tr').css({
            'border': '1px dashed #D8D8D8',
        })
    }
});

Template.pollutantLimit.onRendered(function () {

    }
);

Template.pollutantLimit.onCreated(function () {
        limitArr = [105, 104, 102, 100, 101, 103]

    }
);
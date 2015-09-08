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
        Meteor.call('limitUpdate', arr, function () {
            Util.modal('污染物排放发布限值', '修改成功！')
            $('input[type="number"]').each(function () {
                $(this).val($(this).attr('history'))
            })
        })
    },
    'click .cancel': function () {
        $('input[type="number"]').each(function () {
            $(this).val($(this).attr('history'))
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
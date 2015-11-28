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
    },
    '.editableLimit change': function () {
        console.log(this)
    }
});

Template.pollutantLimit.onRendered(function () {

        $('.editableLimit').editable({
            //success: function (response, newValue) {
            //    console.log(response, newValue)
            //},
            url: function (params) {
                //console.log(params)

                var d = new $.Deferred;
                //async saving data in js model\
                Meteor.call('limitUpdate', params.name, params.value, function (err, res) {
                    if (err) {
                        d.reject(err.message)
                    }
                    else {
                        d.resolve()
                    }
                })
                return d.promise();
            },
            showbuttons: false,
            mode: 'inline',
            validate: function (value) {
                if ($.trim(value) == '') {
                    return '输入不能为空！';
                }
                if (isNaN(Number(value)) || parseInt(value) < 0) {
                    return '输入参数错误！'
                }
            }
        })
    }
);

Template.pollutantLimit.onCreated(function () {
        limitArr = [105, 104, 102, 100, 101, 103]

    }
);
/**
 * Created by bai on 2015/8/20.
 */

Template.user.helpers({

});

Template.user.events({


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
})
;

Template.user.onRendered(function () {

    }
);

Template.user.onCreated(function () {
    }
);
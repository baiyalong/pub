/**
 * Created by bai on 2015/11/17.
 */

Terminal.attachSchema(new SimpleSchema({
    IMEI: {
        type: String
    },
    OS: {
        type: String
    },
    online: {
        type: Boolean
    },
    positionCode: {
        type: Number
    },
    //book array
    timestamp: {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    }
}));


Terminal.allow({
    insert: function () {
        //TODO roles auth here
        return true;
    }, remove: function () {
        return true;
    },
    update: function () {
        return true;
    }
})

Meteor.publish('terminal', function () {
    //TODO page
    return Terminal.find();
})
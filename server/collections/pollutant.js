/**
 * Created by bai on 2015/9/6.
 */


Pollutant.attachSchema(new SimpleSchema({
    pollutantCode: {
        type: Number
    },
    pollutantName: {
        type: String
    },
    chineseName: {
        type: String
    },
    unit: {
        type: String
    },
    limit: {
        type: Number,
        optional: true
    }
}));

Pollutant.allow({
    update: function () {
        //TODO roles auth here
        return true;
    }
})

Meteor.publish('limit', function () {
    return Pollutant.find({}, {
        fields: {
            pollutantCode: 1,
            pollutantName: 1,
            limit: 1
        }
    })
})

Meteor.methods({
    limitUpdate:function(arr){
        arr.forEach(function(e){
            if(e.limit!=undefined){
                Pollutant.update({_id: e.id},{$set:{limit: e.limit}})
            }
        })
    }
})
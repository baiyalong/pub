/**
 * Created by bai on 2015/9/6.
 */

Area = new Mongo.Collection('area');

Area.attachSchema(new SimpleSchema({
    code: {
        type: Number
    },
    name: {
        type: String
    },

}));
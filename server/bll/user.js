/**
 * Created by bai on 2015/8/20.
 */
Meteor.publish(
    'user', function () {
        return Meteor.users.find()
    },
    'roles', function () {
        return Roles.getAllRoles()
    }
)
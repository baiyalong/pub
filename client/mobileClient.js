/**
 * Created by bai on 2015/9/11.
 */


Template.mobileClient.helpers({
    appList: function () {
        return MobileApp.find({}, {sort: {'metadata.timestamp': -1}});
    },
    getPath: function (url) {
        return url.substring(0, url.indexOf('?'));
    },
    getTime: function (timestamp) {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    }
});

Template.mobileClient.events({
    'change input:file': function (event, template) {
        fileS = event.target.files[0];
    },
    'click .cancel': function () {
        $('#deviceType').val('IOS');
        $('#version').val('');
        $('#appFile').val('');
        fileS = null;
    },
    'click .save': function () {
        var deviceType = $('#deviceType').val();
        var version = $('#version').val().trim();
        var file = fileS;
        if (version == '') {
            alert('版本号不能为空！');
            return;
        }
        if (file == null) {
            alert('应用文件不能为空！');
            return;
        }

        Meteor.call('checkVersion', {deviceType: deviceType, version: version}, function (err, res) {
            if (err)Util.modal('移动客户端管理', err);
            else {
                if (res != null) {
                    Util.modal('移动客户端管理', '版本号重复！');
                    return;
                } else {
                    var newFile = new FS.File(file);
                    newFile.metadata = {
                        deviceType: deviceType,
                        version: version,
                        timestamp: new Date()
                    };
                    MobileApp.insert(newFile, function (err, fileObj) {
                        if (err)Util.modal('移动客户端管理', err);
                        else {
                            Util.modal('移动客户端管理', '添加成功！');
                            $('#deviceType').val('IOS');
                            $('#version').val('');
                            $('#appFile').val('');
                            fileS = null;
                        }
                        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                    });
                }
            }
        });
    },
    'click .remove': function () {
        MobileApp.remove({_id: this._id}, function (err) {
            if (err)Util.modal('移动客户端管理', err);
            else
                Util.modal('移动客户端管理', '删除成功！');
        });
    }
});

Template.mobileClient.onRendered(function () {

    }
);

Template.mobileClient.onCreated(function () {
        fileS = null;

    }
);
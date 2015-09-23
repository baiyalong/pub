var a = {


    getLatestVersion: function (deviceType) {
        var app = MobileApp.findOne({deviceType: deviceType}, {sort: {timestamp: -1}})
        return {
            deviceType: app.deviceType,
            latestVersion: app.version,
            downloadUrl: (function (app) {
                var id = '';
                if (deviceType != 'IOS')
                    id = app.app;
                else id = app.conf;
                var url = FileFS.findOne({_id: id}).url();
                return url ? url.substring(1, url.indexOf('?')) : '';
            })(app)
        }
    }


}

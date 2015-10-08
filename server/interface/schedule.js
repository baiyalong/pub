/**
 * Created by bai on 2015/8/20.
 */
//定时任务

SyncedCron.add({
    name: 'Crunch some important numbers for the marketing department',
    schedule: function (parser) {
        // parser is a later.parse object
        return parser.text('every 1 hours');
    },
    job: function () {
        console.log(new Date());
    }
});

//SyncedCron.start();
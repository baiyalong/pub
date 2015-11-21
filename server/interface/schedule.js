/**
 * Created by bai on 2015/8/20.
 */
//��ʱ����

SyncedCron.add({
    name: 'Crunch some important numbers for the marketing department',
    schedule: function (parser) {
        // parser is a later.parse object
        return parser.text('every 5 seconds');
    },
    job: function () {
        console.log(new Date());
    }
});

//SyncedCron.start();
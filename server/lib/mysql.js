/**
 * Created by bai on 2015/11/16.
 */


var liveDb = new LiveMysql({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'leaderboard'
});

var closeAndExit = function() {
    liveDb.end();
    process.exit();
};

// Close connections on hot code push
process.on('SIGTERM', closeAndExit);
// Close connections on exit (ctrl + c)
process.on('SIGINT', closeAndExit);
/**
 * Created by bai on 2015/11/16.
 */


my_connectionName = "my_connection"; // Name your connection as you wish

CreateMySQLConnection(my_connectionName, {
    host: "localhost", // MySQL host address or IP
    database: "NMHBSource",   // MySQL database name
    user: "root",      // MySQL username
    password: ""  // MySQL password
});

syncMysql = function () {
    OpenMySQLConnection(my_connectionName, function (e) {
        if (e) {
            console.log("Error: " + e.code + " " + e.reason);
            return;
        }

        console.log('OpenMySQLConnection  ', "Connected. Initializing shadow...");

        CreateMySQLShadow(my_connectionName, {}, function (e) {
            if (e) {
                console.log("Error: " + e.code + " " + e.reason);
                return;
            }

            console.log('CreateMySQLShadow', "Shadow initialized. Copying data to mongo...");

            MySQLShadowSyncAll(my_connectionName, {}, function (e) {
                if (e) {
                    console.log("Error: " + e.code + " " + e.reason);
                    return;
                }

                // If you want changes to your collections to be automatically replicated back to MySQL do something like this:
                // MySQLShadowCollection(SomeCollection, connectionName, {});

                console.log('MySQLShadowSyncAll', "Success.");
                CloseMySQLConnection(my_connectionName, function (e) {
                    if (e) {
                        console.log("Error: " + e.code + " " + e.reason);
                        return;
                    }
                    console.log('MySQLShadowSyncAll', "Success.");
                })
            });
        });
    });

}

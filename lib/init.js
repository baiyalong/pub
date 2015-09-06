/**
 * Created by bai on 2015/9/6.
 */
Meteor.startup(function () {


    if (Area.find().count() == 0) {
        var data = JSON.parse(Assets.getText("area.json"));
        data.forEach(function (e) {
            Area.insert(e)
        });
    }

    if (Pollutant.find().count() == 0) {
        var data = JSON.parse(Assets.getText("pollutant.json"));
        data.forEach(function (e) {
            Pollutant.insert(e)
        });
    }

    if (Station.find().count() == 0) {
        var data = JSON.parse(Assets.getText("station.json"));
        data.forEach(function (e) {
            Station.insert(e)
        });
    }


    //TODO config
})


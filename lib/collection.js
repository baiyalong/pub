/**
 * Created by bai on 2015/9/7.
 */

Area = new Mongo.Collection('area');
ForecastData = new Mongo.Collection('forecastData');
MonitorData = new Mongo.Collection('monitorData');
Log = new Mongo.Collection('log');
Pollutant = new Mongo.Collection('pollutant');
Station = new Mongo.Collection('station');
Warning = new Mongo.Collection('warning');
AirQuality = new Mongo.Collection('airQuality');

FileFS = new FS.Collection('file', {
    stores: [new FS.Store.GridFS('file', {})]
})
MobileApp = new Mongo.Collection('mobileApp')

IPTrustList = new Mongo.Collection('IpTrustList')
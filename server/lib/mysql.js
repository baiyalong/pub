//mysql connect

mysql = Mysql.connect({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'NMHBSource'
});


//mysql tables

PollutantInfo = mysql.meteorCollection("POLLUTANT", "PollutantInfo");
MonitorStationInfo = mysql.meteorCollection("T_ENV_AUTOMONI_AIRSTATIONINFO", "MonitorStationInfo");

CityDailyRaw = mysql.meteorCollection("AIR_CITYDAY_AQI_SRC", "CityDailyRaw");
CityDailyAudit = mysql.meteorCollection("AIR_CITYDAY_AQI_APP", "CityDailyAudit");

CityHourlyRaw = mysql.meteorCollection("AIR_CITYHOUR_AQI_DATA","CityHourlyRaw");

StationDailyRaw = mysql.meteorCollection("AIR_STATIONDAY_AQI_SRC","StationDailyRaw")
StationDailyAudit = mysql.meteorCollection("AIR_STATIONDAY_AQI_APP","StationDailyAudit")

StationHourlyRaw = mysql.meteorCollection("T_ENV_AUTOMONI_AIRDATA_HOUR_S", "StationHourlyRaw");
StationHourlyAudit = mysql.meteorCollection("T_ENV_AUTOMONI_AIRDATA_HOUR", "StationHourlyAudit");

/**
 * Created by bai on 2015/8/20.
 */
//��ʱ����

scheduleJobs.syncMysql = {
  schedule:function(parser){
    return parser.text('every 5 s');
  },
  job:function(){
    syncMysql();
  }
}


scheduleJobs.syncPollutantInfo = {
  schedule:function(parser){
   // return parser.text('at 2:00 am');
    return parser.text('every 5 s');
  },
  job:function(){}
}

scheduleJobs.syncMonitorInfo={
  schedule:function(parser){
    return parser.text('at 3:00 am');
  },
  job:function(){}
}

scheduleJobs.syncCityPollutantDaily={
  schedule:function(parser){
    return parser.text('at 4:00 am');
  },
  job:function(){}
}

scheduleJobs.syncMonitorPoillutantHourly={
  schedule:function(parser){
    return parser.text('every 1 hours');
  },
  job:function(){}
}

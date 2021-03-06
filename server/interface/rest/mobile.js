/**
 * Created by bai on 2015/8/21.
 */
//�ƶ��ն˽ӿ�


Api.addRoute('cityBasic/:id', {
    get: function () {
        return BLL.mobile.cityBasic(this.urlParams.id);
    }
})


Api.addRoute('areaDetail/:id', {
    get: function () {
        return BLL.mobile.areaDetail(this.urlParams.id);
    }
})


Api.addRoute('cityHistory/', {
    get: function () {
        return BLL.mobile.cityHistory(this.queryParams);
    }
})

Api.addRoute('stationMonitor/:id', {
    get: function () {
        return BLL.mobile.stationMonitor(this.urlParams.id);
    }
})

Api.addRoute('getLatestVersion/:deviceType', {
    get: function () {
        return BLL.mobile.getLatestVersion(this.urlParams.deviceType);
    }
})

Api.addRoute('map/:level', {
    get: function () {
        return BLL.mobile.map(this.urlParams.level);
    }
})

Api.addRoute('pollutantLimit/', {
    get: function () {
        return BLL.mobile.pollutantLimit();
    }
})

Api.addRoute('rank/:day', {
    get: function () {
        return BLL.mobile.rank(this.urlParams.day);
    }
})

Api.addRoute('terminalStatus/', {
    post: function () {
        //console.log(this.bodyParams)
        return BLL.mobile.terminalStatus(this.bodyParams);
    }
})
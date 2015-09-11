/**
 * Created by bai on 2015/8/21.
 */

//内蒙环保官网接口


Api.addRoute('cityAreaQuality/', {
    get: function () {
        return BLL.www.cityAreaQuality();
    }
})


Api.addRoute('cityMonitorStation/', {
    get: function () {
        return BLL.www.cityMonitorStation();
    }
})


Api.addRoute('cityDetail/:id', {
    get: function () {
        return BLL.www.cityDetail(this.urlParams.id);
    }
})
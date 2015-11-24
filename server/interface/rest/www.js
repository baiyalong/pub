/**
 * Created by bai on 2015/8/21.
 */

//���ɻ��������ӿ�


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


Api.addRoute('area', {
    get: function () {
        return BLL.www.area();
    }
})

Api.addRoute('airQualityForcast',{
    get:function(){
        return BLL.www.airQualityForcast();
    }
})
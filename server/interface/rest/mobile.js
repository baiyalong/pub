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
/**
 * Created by bai on 2015/8/21.
 */
//ÒÆ¶¯ÖÕ¶Ë½Ó¿Ú


Api.addRoute('cityBasic/:id', {
    get: function () {
        var id = this.urlParams.id;
        return BLL.mobile.cityBasic(id);
    }
})


Api.addRoute('areaDetail/:id', {
    get: function () {
        var id = this.urlParams.id;
        return BLL.mobile.areaDetail(id);
    }
})


Api.addRoute('cityHistory/:id/:type', {
    get: function () {
        var id = this.urlParams.id;
        var type = this.urlParams.type;
        return BLL.mobile.cityHistory(id, type);
    }
})
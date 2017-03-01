/**
 * @fileOverview jquery 二级选单插件
 * @author ewen
 * @example
 *  <form action="" id="dealerSelect">
 *  <select name="province"></select>
 *  <select name="city"></select>
 *  </form>
 *  script:
 *     ewen.CitySelect.init("#dealerSelect","province","city");
 *  or
 *     ewen.CitySelect.init("#dealerSelect");
 */
;
var ewenx = ewenx || {};

ewenx.CitySelect = function () {

    var my = {"version": '1.0.0'};

    /**
     * @description 初始化表单
     * @param {Num} domID 表单ID
     * @param {Num} provinceName 省级选单名称
     * @param {Num} cityName 市级选单名称
     * @param {Num} countName 地区级选单名称
     */
    var lang = (navigator.appName == "Netscape") ? navigator.language : navigator.userLanguage;

    my.lang = lang == 'zh-TW' ? 1 : 0;
    my.init = function (domID, provinceName, cityName, countyName) {
        var __province = provinceName || 'province';
        var __city = cityName || 'city';
        var __county = countyName || 'county';

        my.province = $(domID).find("select[name='" + __province + "']");
        my.city = $(domID).find("select[name='" + __city + "']");
        my.county = $(domID).find("select[name='" + __county + "']");

        my.province.empty();
        // console.log(city_data_taotong[1][0]%10000);
        for (var dd = 0, citylen = city_data_taotong.length; dd < citylen; dd++){
            var citycode = city_data_taotong[dd][0]%10000;
            // console.log(citycode);
            if (citycode == 0){
                my.province.append("<option value='" + city_data_taotong[dd][1] + "' a='" + city_data_taotong[dd][0] + "'>" + city_data_taotong[dd][1] + "</option>");
            }
        }
        // for (var i = 0, len = city_provinces_data.length; i < len; i++) {
        //     my.province.append("<option value='" + city_provinces_data[i][1][my.lang] + "' a='" + city_provinces_data[i][0] + "'>" + city_provinces_data[i][1][my.lang] + "</option>");
        //     // my.province.append(new Option(city_provinces_data[i][1][my.lang], city_provinces_data[i][0]));
        // }
        my.getCity(city_data_taotong[0][0]);

        my.province.change(function () {            
            my.getCity($("select[name='province'] option:selected").attr("a"));
        });
        my.city.change(function () {
            my.getCounty($("select[name='city'] option:selected").attr("a"));
        })
    };

    my.getCity = function (curProvince) {
        //清空 城市 下拉选单
        my.city.empty();
        var prox = curProvince/10000;
        // console.log(prox);
        // console.log(parseInt(city_data_taotong[2][0]/10000));
        var i, j;
        for (i = 0; i < city_data_taotong.length; i++) {
            //得到 当前省 在 城市数组中的位置
            if ((city_data_taotong[i][0]%10000 !== 0) && (city_data_taotong[i][0]%100 == 0) && (parseInt(city_data_taotong[i][0]/10000)==prox)) {
                my.city.append("<option value='" + city_data_taotong[i][1] + "' a='" + city_data_taotong[i][0] + "'>" + city_data_taotong[i][1] + "</option>");
                // my.city.append(new Option(city_cn_data[i][1][my.lang], city_cn_data[i][0]));
            }
        }
        if (($("select[name='city'] option").length == 0)){
            for (j = 0; j < city_data_taotong.length; j++){
                if (city_data_taotong[j][0] == curProvince){
                    my.city.append("<option value='" + city_data_taotong[j][1] + "' a='" + city_data_taotong[j][0] + "'>" + city_data_taotong[j][1] + "</option>");
                }

            }

        }
        my.getCounty($("select[name='city'] option:selected").attr("a"));
    };

    my.getCounty = function (curCity) {
        //清空 城市 下拉选单
        my.county.empty();
        var prox = curCity/100;
        var proy = curCity%10000;
        var i, j;
        if (proy==0){
            for (j = 0; j < city_data_taotong.length; j++) {
                if ((parseInt(city_data_taotong[j][0]/10000) == curCity/10000) && (city_data_taotong[j][0] != curCity)) {
                    my.county.append("<option value='" + city_data_taotong[j][1] + "' a='" + city_data_taotong[j][0] + "'>" + city_data_taotong[j][1] + "</option>");
                }
            }
        }
        console.log(prox + curCity);
        
        for (i = 0; i < city_data_taotong.length; i++) {
            if ((city_data_taotong[i][0]%100 != 0) && (parseInt(city_data_taotong[i][0]/100)==prox)) {
                my.county.append("<option value='" + city_data_taotong[i][1] + "' a='" + city_data_taotong[i][0] + "'>" + city_data_taotong[i][1] + "</option>");
            }
        }
    };
    return my;
}
;

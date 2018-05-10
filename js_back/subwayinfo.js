"use strict";

// 地铁信息
var SubWayInfo = function(text) {
    var goldApi = new GoldSunStorage(null);
    if (text) {
        var obj = JSON.parse(text);
        this.cityName = obj.cityName;
        this.subWayNum = obj.subWayNum;
        this.stationNameList = obj.stationNameList;
        this.from = text.from;
	} else {
	    this.cityName = "";
        this.subWayNum = "";
        this.stationNameList = "";
        this.from = "";
	}
};
SubWayInfo.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};
// 房价信息
var HousePriceInfo = function(text) {
    if (text) {
        var obj = JSON.parse(text);
        this.houseName = obj.houseName;
        this.avgPrice = obj.avgPrice;
        this.highestPrice = obj.highestPrice;
        this.lowestPrice = obj.lowestPrice;
        this.lineDistance = obj.lineDistance;
        this.subWayInfo = obj.subWayInfo;
        this.from = text.from;
	} else {
	    this.houseName = "";
        this.avgPrice = "";
        this.highestPrice = "";
        this.lowestPrice = "";
        this.lineDistance = "";
        this.subWayInfo = "";
        this.from = "";
	}
};
HousePriceInfo.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};

var SubWayhouseInfoSys = function() {
    var goldApi = new GoldSunStorage(null);
    goldApi.defineProperty(this, "subway_info_num");
    goldApi.defineMapProperty(this, "arr_subway_info");
    goldApi.defineMapProperty(this, "subway_info_data", {
        parse: function (text) {
            return new SubWayInfo(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    goldApi.defineProperty(this, "house_price_info_num");
    goldApi.defineMapProperty(this, "arr_house_price_info");
    goldApi.defineMapProperty(this, "house_price_info_data", {
        parse: function (text) {
            return new HousePriceInfo(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

SubWayhouseInfoSys.prototype = {
    init: function() {
        this.subway_info_num = 0;
        this.house_price_info_num = 0;
    },
    /**
     * 添加地铁信息
     */
    add_subway_info: function(cityName, subWayNum, stationNameList) {
        // 判断是否存在该条地铁信息
        if (this._charge_is_subway_exist(cityName, subWayNum)) {
            // 存在，抛出异常
            throw new Error("subway info is exist");
        }
        var subWayInfo = new SubWayInfo();
        // subWayInfo.from = Blockchain.transaction.from;
        subWayInfo.from="n1RMP8pgASAXpB2ZG3aqotHBaH92697Saab";
        subWayInfo.cityName = cityName;
        subWayInfo.subWayNum = subWayNum;
        // 存储地铁信息
        subWayInfo.stationNameList = stationNameList;
        this.arr_subway_info.put(this.subway_info_num, cityName + "_" + subWayNum);
        this.subway_info_data.put(cityName + "_" + subWayNum, subWayInfo);
        this.subway_info_num++;

    },

    /**
     * 查询有地铁的城市信息
     */
    query_city_info: function() {
        var city_info_all = {
            type: "city",
            city_list: [],
        };
        if (this.subway_info_num == 0) {
            return city_info_all;
        }

        
        for(var i = 0; i < this.subway_info_num; i++) {
            var city_info = {
                name: "",
                value: "",
            };
            city_info.name = "city";
            var key = this.arr_subway_info.get(i);
            var cityObj = this.subway_info_data.get(key);
            city_info.value = cityObj.cityName;
            // 判断是否存在
            var isExist = false;
            for(var j = 0; j < city_info_all.city_list.length; j++) {
                if(city_info_all.city_list[j].value == cityObj.cityName) {
                    isExist = true;
                    break;
                }
            }
            if(!isExist) {
                city_info_all.city_list.push(city_info);
            }
        }
        return city_info_all;
    },

    /**
     * 查询指定城市的地铁线信息
     */
    query_subway_info_by_city: function(cityName) {
        if (this.subway_info_num == 0) {
            throw new Error("read subway info failed");
        }
        var subway_list_of_city = new Array();
        for(var i = 0; i < this.subway_info_num; i++) {
            var key = this.arr_subway_info.get(i);
            var city_name = this.subway_info_data.get(key).cityName;
            if (city_name == cityName) {
                var cityObj = this.subway_info_data.get(key);
                subway_list_of_city.push(cityObj);
            }
        }
        return JSON.stringify(subway_list_of_city);
    },

    /**添加房价信息
     * subWayInfo: {"cityName":"xx", "subWayNum": "xx", "stationName": "xx"}
     * houseInfo: {"houseName": "xx", "avgPrice": "xx", "highestPrice": "xx", "lowestPrice":"xx", "lineDistance":"xx"}
     */
    add_house_price_info: function(subWayInfo, houseInfo) {
        var tempSubWayInfo = JSON.parse(subWayInfo);
        var temphouseInfo = JSON.parse(houseInfo);
        if (this._charge_is_house_exist(tempSubWayInfo.cityName, tempSubWayInfo.subWayNum, tempSubWayInfo.stationName, temphouseInfo.houseName) == true) {
            // 已经存在该房价信息
            throw new Error("house info is exist");
        }
        
        // 存入信息
        var key = tempSubWayInfo.cityName + "_" + tempSubWayInfo.subWayNum + "_" + tempSubWayInfo.stationName + "_" + temphouseInfo.houseName;
        var houseInfo = new HousePriceInfo();
        houseInfo.houseName = temphouseInfo.houseName;
        houseInfo.avgPrice = temphouseInfo.avgPrice;
        houseInfo.highestPrice = temphouseInfo.highestPrice;
        houseInfo.lowestPrice = temphouseInfo.lineDistance;
        houseInfo.subWayInfo = tempSubWayInfo.cityName + "_" + tempSubWayInfo.subWayNum + "_" + tempSubWayInfo.stationName;
        // houseInfo.from = Blockchain.transaction.from;
        houseInfo.from = "n1RMP8pgASAXpB2ZG3aqotHBaH92697Saab";
        this.arr_house_price_info.put(this.house_price_info_num, key);
        this.house_price_info_data.put(key, houseInfo);
        this.house_price_info_num++;
    },
    /**查询房屋列表 */
    query_house_list_info: function(cityName, subWayNum, stationName) {
        var house_list_key = cityName + "_" + subWayNum + "_" + stationName;
        if (this.house_price_info_num == 0) {
            return "";
        }
        
        var house_list = new Array();

        for(var i = 0; i < this.house_price_info_num; i++) {
            var key = this.arr_house_price_info.get(i);
            var subway_info = this.house_price_info_data.get(key).subWayInfo;
            if (subway_info == house_list_key) {
                var houseObj = this.house_price_info_data.get(key)
                house_list.push(houseObj);
            }
        }
        return JSON.stringify(house_list);
    },

    /**查询指定房屋价格信息 */
    query_house_price_info: function(cityName, subWayNum, stationName, houseName) {
        var price_key = cityName + "_" + subWayNum + "_" + stationName + "_" + houseName;
        var tempPriceInfo = this.house_price_info_data.get(price_key);
        return JSON.stringify(tempPriceInfo);
    },
    /**
     * 判断地铁信息是否存在
     */
    _charge_is_subway_exist: function(cityName, subWayNum) {
        var key = cityName + "_" + subWayNum;
        var subWayInfoObj = this.subway_info_data.get(key);
        if (subWayInfoObj == null) {
            return false;
        } else {
            return true;
        }
    },

    /**判断房价信息是否存在 */
    _charge_is_house_exist: function(cityName, subWayNum, stationName, houseName) {
        var key = cityName + "_" + subWayNum + "_" + stationName + "_" + houseName;
        var houseInfoObj = this.house_price_info_data.get(key);
        if(houseInfoObj && houseInfoObj.from) {
            return true;
        } else {
            return false;
        }
    },
    
};


window.SubWayhouseInfoSys = SubWayhouseInfoSys;
import { isError } from "util";

"use strict";

// 地铁信息
var SubWayInfo = function(text) {
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
    LocalContractStorage.defineProperty(this, "subway_info_num");
    LocalContractStorage.defineMapProperty(this, "arr_subway_info");
    LocalContractStorage.defineMapProperty(this, "subway_info_data", {
        parse: function (text) {
            return new SubWayInfo(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    LocalContractStorage.defineProperty(this, "house_price_info_num");
    LocalContractStorage.defineMapProperty(this, "arr_house_price_info");
    LocalContractStorage.defineMapProperty(this, "house_price_info_data", {
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

    test_mult_arg: function(arg1, arg2, arg3) {
        return "success" + arg1 + "," + arg2 + "," + arg3;
    },
    test_mult_no_arg: function() {
        return "success";
    },
    test_one_arg: function(args) {
        return "success" + args;
    }
};

module.exports = SubWayhouseInfoSys;

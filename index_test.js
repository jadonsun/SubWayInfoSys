
'use strict';

var subWayhouseInfoSys;

// 添加地铁信息
function testAddSubWayInfo() {
    var cityName = "深圳";
    var subWayNum = "1号线";
    var stateList = new Array();
    stateList.push("桃园");
    stateList.push("深大");
    stateList.push("高新园");
    var sStateList = JSON.stringify(stateList);
    console.log(sStateList);
    subWayhouseInfoSys.add_subway_info(cityName, subWayNum, sStateList);

    var cityName = "深圳";
    var subWayNum = "2号线";
    var stateList = new Array();
    stateList.push("赤湾");
    stateList.push("东角头");
    stateList.push("后海");
    var sStateList = JSON.stringify(stateList);
    subWayhouseInfoSys.add_subway_info(cityName, subWayNum, sStateList);
}
// 添加房价信息
function testAddhouseInfo() {
    var subWayInfo = {
        "cityName":"深圳",
        "subWayNum": "1号线", 
        "stationName": "深大"
    };
    var houseInfo = {
        "houseName": "深南花园1栋",
        "avgPrice": "5万", 
        "highestPrice": "5.7万",
        "lowestPrice":"4.3万",
        "lineDistance":"500米"
    };
    subWayhouseInfoSys.add_house_price_info(JSON.stringify(subWayInfo), JSON.stringify(houseInfo));

    var subWayInfo = {
        "cityName":"深圳",
        "subWayNum": "1号线", 
        "stationName": "深大"
    };
    var houseInfo = {
        "houseName": "科苑小区",
        "avgPrice": "7万", 
        "highestPrice": "9.7万",
        "lowestPrice":"4.3万",
        "lineDistance":"1.5千米"
    };
    subWayhouseInfoSys.add_house_price_info(JSON.stringify(subWayInfo), JSON.stringify(houseInfo));

    var subWayInfo = {
        "cityName":"深圳",
        "subWayNum": "2号线", 
        "stationName": "赤湾"
    };
    var houseInfo = {
        "houseName": "山海居",
        "avgPrice": "5.3万", 
        "highestPrice": "5.5万",
        "lowestPrice":"4.7万",
        "lineDistance":"2千米"
    };
    subWayhouseInfoSys.add_house_price_info(JSON.stringify(subWayInfo), JSON.stringify(houseInfo));


}
// 显示城市信息
function testShowCity() {
    var city_list_info = subWayhouseInfoSys.query_city_info();
    console.log(city_list_info);
}

// 显示指定城市的地铁线
function testShowCitySubWayLine() {
    var cityLineList = subWayhouseInfoSys.query_subway_info_by_city("深圳");
    console.log("get 深圳 line list = " + cityLineList);
}

// 查询房屋列表
function testShowhouseList() {
    var house_list = subWayhouseInfoSys.query_house_list_info("深圳", "1号线", "深大");
    console.log("get 深圳 1号线 深大附近  " + house_list);
}

// 查询房价
function testhousePrice() {
    var house_price = subWayhouseInfoSys.query_house_price_info("深圳", "1号线", "深大", "科苑小区");
    console.log("get 深圳1号线深大站科苑小区价格 = " + house_price);
}

// 显示地铁线信息
function testSubWaySys() {
    testAddSubWayInfo();
    testAddhouseInfo();
    testShowCity();
    testShowCitySubWayLine();
    testShowhouseList();
    testhousePrice();
}
function init() {

    subWayhouseInfoSys = new SubWayhouseInfoSys();
    subWayhouseInfoSys.init();
}
    
init();

testSubWaySys();
    
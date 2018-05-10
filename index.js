

'use strict';

var dappAddress = "n1o1qV2pJr9XLFuRaKF1e9G1Ngf3YL6QYCs";
var SubWayInfo = function() {
    this.select_city = "";
    this.select_subway_line = "";
    this.select_subway_station = "";
}
SubWayInfo.prototype = {

    init: function() {
        var self = this;
        $("#add-subway-info").click(function() {
            $("input-city_error").hide();
            $('#add-subway-info-input').modal('show'); 
        });
        $("#commit-subway-info").click(function() {
            self.addCitySubWayList();
        });
        $("#cancel-subway-info").click(function() {
            $('#add-subway-info-input').modal('hide')  
        });
        $("#add-subway-house-info").click(function() {
            $("input-house-error").hide();
             $('#add-house-info-input').modal('show'); 
        });

        $("#commit-house-info").click(function() {
            self.addHouseInfo();
        });
        $("#cancel-house-info").click(function() {
            $("#input-house-error").hide();
            $('#add-house-info-input').modal('hide'); 
        });


    },
    addCitySubWayList: function() {
        var city_name = $("#city-name-input").val();
        var subway_line = $("#city-line-input").val();
        var station_info = $("#subway-info-input").val();
        if(city_name == "") {
            $("#input-city_error").html("<strong>错误:</strong>城市名称不能为空.");
            $("#input-city_error").show();
            return;
        }
        if(subway_line == "") {
            $("#input-city_error").html("<strong>错误:</strong>地铁线不能为空.");
            $("#input-city_error").show();
            return;
        }
        if(station_info == "") {
            $("#input-city_error").html("<strong>错误:</strong>地铁站点不能为空.");
            $("#input-city_error").show();
            return;
        }
        // 解析站点信息
        var station_list;
        try {
            station_list = JSON.parse(station_info);

        } catch (error) {
            $("#input-city_error").html("<strong>错误:</strong>地铁站点格式错误.");
            $("#input-city_error").show();
            return;
        }
        var req_list = [];
        req_list.push(city_name);
        req_list.push(subway_line);
        req_list.push(station_list);

        // 组装成参数
        var func = "add_subway_info";
        var req_list_s = JSON.stringify(req_list);

        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : func,
                    "args" : JSON.stringify(req_list),
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
        
        $('#add-subway-info-input').modal('hide');
    },

    addHouseInfo: function() {
        var self = this;
        if(self.select_city == undefined || self.select_city == ""){
            $("#input-house-error").html("<strong>错误:</strong>请先选择地铁站信息.");
            $("#input-house-error").show();
            return;
        }
        var house_name = $("#house-name-input").val();
        var house_price = $("#house-price-input").val();
        var price_most = $("#price-most-input").val();
        var price_lowest = $("#price-lowest-input").val();
        var line_distance = $("#line-distance-input").val();
        var person_name = $("#person-name-input").val();
        if(house_name == "") {
            $("#input-house-error").html("<strong>错误:</strong>房屋名称不能为空.");
            $("#input-house-error").show();
            return;
        }
        if(house_price == "") {
            $("#input-house-error").html("<strong>错误:</strong>均价不能为空.");
            $("#input-house-error").show();
            return;
        }
        if(price_most == "") {
            $("#input-house-error").html("<strong>错误:</strong>最高价不能为空.");
            $("#input-house-error").show();
            return;
        }
        if(price_lowest == "") {
            $("#input-house-errorr").html("<strong>错误:</strong>最低价不能为空.");
            $("#input-house-error").show();
            return;
        }
        if(line_distance == "") {
            $("#input-house-error").html("<strong>错误:</strong>直线距离不能为空.");
            $("#input-house-error").show();
            return;
        }
        if(person_name == "") {
            $("#input-house-error").html("<strong>错误:</strong>录入者昵称不能为空.");
            $("#input-house-error").show();
            return;
        }
        // 组装成参数
        var func = "add_house_price_info";
        // houseInfo: {"houseName": "xx", "avgPrice": "xx", "highestPrice": "xx", "lowestPrice":"xx", "lineDistance":"xx"}
        var subway_info = {
            "cityName": self.select_city,
            "subWayNum": self.select_subway_line,
            "stationName": self.select_subway_station
        };
        var houseInfo = {
            "houseName": house_name,
            "avgPrice": house_price,
            "highestPrice": price_most,
            "lowestPrice": price_lowest,
            "lineDistance": line_distance,
            "authName": person_name
        };

        var req_list = [];
        req_list.push(subway_info);
        req_list.push(houseInfo);

        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : func,
                    "args" : JSON.stringify(req_list),
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
        
        $('#add-house-info-input').modal('hide');
    },
    queryCityList:function() {
        console.log("query city info list");
        var func = "query_city_info";
        var args = "";

        $("#loading").text("加载城市列表中");
        $("#loading").show();

        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : func,
                    "args" : args
                }
            },
            "method": "neb_call"
        }, "*");
    },
    querySubWayList:function(city_name) {
        console.log("query subway info list by city");
        $("#loading").text("加载地铁列表中");
        $("#loading").show();
        $("#tip-query-subway").hide();
        var func = "query_subway_info_by_city";
        var args = "[\""+city_name+"\"]";
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : func,
                    "args" : args
                }
            },
            "method": "neb_call"
        }, "*");
    },

    querySubWayHourseInfo: function() {
        var self = this;
        console.log("query subway_station house list");
        $("#loading").text("加载房价中");
        $("#loading").show();
        $("#tip-query-subway").hide();
        var func = "query_house_list_info";
        // var req_arg = [];
        // req_arg.push(self.select_city);
        // req_arg.push(self.select_subway_line);
        // req_arg.push(self.select_subway_station);
        // var req_arg_s = JSON.stringify(req_arg);

        var req_arg_s = "[\""+self.select_city+"\",\""+self.select_subway_line+"\",\""+self.select_subway_station+"\"]";
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : func,
                    "args" : req_arg_s
                }
            },
            "method": "neb_call"
        }, "*");
    },



    listenWindowMessage: function() {
        var self = this;
        window.addEventListener('message', function(e) {
            // e.detail contains the transferred data
            if(e.data && e.data.data && e.data.data.neb_call) {
                // 收到返回数据
                if(e.data.data.neb_call.result) {
                    // 解析数据
                    var obj = JSON.parse(e.data.data.neb_call.result);
                    if (obj.type == "city") {
                        self.processQueryCityInfo(obj);
                    } else if(obj.type == "subway") {
                        self.processQuerySubWayInfo(obj);
                    } else if(obj.type == "house") {
                        self.processQueryHouseInfo(obj);
                    } else if(obj.type == "house_price") {
                        self.processHousePriceInfo(obj);
                    } else {
                        console.log("no need process message");
                    }
                } else {
                    $("#loading").hide();
                    console.log("Get Data From Constract Faield");
                }
            }
        });
    },

    processQueryCityInfo: function(city_info_obj) {
        var self = this;
        console.log("get city_info, city_info = " + JSON.stringify(city_info_obj));
        // 刷新到界面
        var temp_city_list = [];
        for(var t = 0; t < city_info_obj.city_list.length; t++) {
            var isExist = false;
            for(var m = 0; m < temp_city_list.length; m++) {
                if(temp_city_list[m].value == city_info_obj.city_list[t].value) {
                    isExist = true;
                    break;
                }
            }
            if(!isExist) {
                temp_city_list.push(city_info_obj.city_list[t]);
            }
        }
        var city_num = temp_city_list.length;
        if (city_num > 0) {
            // 存在城市信息
            $("#no-city-info").hide();
            $("#city-list-container").show();

            var tr_num = parseInt(city_num / 7);
            if ((city_num % 7) != 0) {
                tr_num++;
            }

            // 插入数据
            for(var i = 0; i < tr_num; i++) {
                var cur_begin_index = i * 7;
                var cur_end_index = (i + 1) * 7;
                var insert_html = "<tr>";
                if (cur_end_index >= city_num) {
                    cur_end_index = city_num;
                }
                for(var j = cur_begin_index; j < cur_end_index; j++) {
                    insert_html = insert_html + "<td><a>";
                    insert_html = insert_html + temp_city_list[j].value;
                    insert_html = insert_html + "</a></td>";
                }
                insert_html = insert_html + "</tr>"
                var tr_new = $("#city-list-body").append(insert_html);
            }
            
        } else {
            // 不存在
            $("#city-list-container").hide();
            $("#no-city-info").show();
        }
        $("#loading").hide();

        // 事件
        $("#city-list-body a").click(function() {
            // 加颜色
            $("#city-list-body").find("a").removeClass("cur");
            $("#sub-way-list").empty();
            $(this).addClass("cur");
            var city_name = $(this).text();
            self.select_subway_line = "";
            self.select_subway_station = "";
            self.querySubWayList(city_name);
        });
    },


    processQuerySubWayInfo: function(subway_info_obj) {
        var self = this;
        console.log("get subway_info, subway_info = " + JSON.stringify(subway_info_obj));
        $("#loading").hide();
        var sub_way_num = subway_info_obj.subway_list_of_city.length;
        for(var i = 0; i < sub_way_num; i++) {
            var insert_html = "<li><div class='grey lia'>";
            var temp_line_name = "地铁" + subway_info_obj.subway_list_of_city[i].subWayNum + "线";
            insert_html = insert_html + temp_line_name;

            // 获取站台列表
            var station_list = subway_info_obj.subway_list_of_city[i].stationNameList
            for(var j = 0; j < station_list.length; j++) {
                insert_html = insert_html + "<a class='zhan' data-city='";
                
                insert_html = insert_html + subway_info_obj.subway_list_of_city[i].cityName;
                insert_html = insert_html + "' data-line='";
                insert_html = insert_html + subway_info_obj.subway_list_of_city[i].subWayNum;
                insert_html = insert_html + "'>";
                insert_html = insert_html + station_list[j];
                insert_html = insert_html + "</a>";
            }
            insert_html = insert_html + "</div></li>"
            $("#sub-way-list").append(insert_html);
        }

        // 事件
        $("#sub-way-list a").click(function() {
            // 加颜色
            $("#sub-way-list").find("a").removeClass("cur");
            $("#house-info-list").empty();
            $(this).addClass("cur");
            self.select_city = $(this).attr("data-city");
            self.select_subway_line = $(this).attr("data-line");
            self.select_subway_station = $(this).text();
            self.querySubWayHourseInfo();
        });
    },
    processQueryHouseInfo: function(house_info_obj) {
        var self = this;
        $("#loading").hide();
        var house_list = house_info_obj.house_list;
        if (house_list.length == 0) {
            $("#house-list-table").hide();
            $("#no-house-info").show();
            return;
        }
        $("#no-house-info").hide();
        $("#house-list-table").show();

        // 显示到界面上
        for (var i = 0; i < house_list.length; i++) {
            var house_info = house_list[i];
            var tr_html = "<tr id='house-price-reward'>";
            tr_html += "<th>";
            tr_html += house_info.houseName;
            tr_html += "</th>";
            tr_html += "<th>";
            tr_html += house_info.avgPrice;
            tr_html += "</th>";
            tr_html += "<th>";
            tr_html += house_info.lowestPrice;
            tr_html += "</th>";
            tr_html += "<th>";
            tr_html += house_info.highestPrice;
            tr_html += "</th>";
            tr_html += "<th>";
            tr_html += house_info.lineDistance;
            tr_html += "</th>";
            tr_html += "<th>";
            tr_html += house_info.authName;
            tr_html += "</th>";
            // tr_html += "<th>";
            // tr_html += '<button type="submit" class="btn btn-primary" data-from="'
            // tr_html += house_info.from;
            // tr_html += '"> 打赏</button>';
            // tr_html += "</th>";
            tr_html += "</tr>";
            $("#house-info-list").append(tr_html);
        }

        // 绑定事件
        // $("#house-price-reward button").on('click', function() {
        //     var from = $(this).attr("data-from");
        //     // 发送打赏请求

        // });
            
        console.log("get house_info, house_info = " + JSON.stringify(house_info_obj));
    },
    processHousePriceInfo: function(house_price_info_obj) {
        console.log("get house_price_info, house_price_info = " + JSON.stringify(house_price_info_obj));
    },
}

var subWayInfoObj;

function checkNebpay() {
    console.log("check nebpay")
    try{
        var NebPay = require("nebpay");

        

    }catch(e){
        //alert ("Extension wallet is not installed, please install it first.")
        console.log("no nebpay");
        $("#noExtension").removeClass("hide")
    }

    // 环境ok，拉取数据
    subWayInfoObj = new SubWayInfo();
    subWayInfoObj.init();
    subWayInfoObj.listenWindowMessage();
    subWayInfoObj.queryCityList();
}



function initPage() {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("web page loaded...")
        setTimeout(checkNebpay,1000);
    });
}

initPage();
    
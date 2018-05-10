"use strict";


// 项目中所有要存储的字段，都封装到一个类似于SampleDataItem的对象中，对象初始化方法如下
var SampleDataItem = function(text) {
	if (text) {
        var obj = JSON.parse(text);
        this.sampleData_1 = obj.sampleData_1;
        this.sampleData_2 = obj.sampleData_2;
        this.sampleData_3 = obj.sampleData_3;
	} else {
	    this.sampleData_1 = "";
        this.sampleData_2 = "";
        this.sampleData_3 = "";
	}
};
SampleDataItem.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};

var ApiSample = function() {
    // 1. 先创建GoldSunStorage对象（用于存储数据）
    var goldApi = new GoldSunStorage(null);
    // 2. 定义数据结构，该行代码作用：为ApiSample创建一个属性sample_data，该属性是一个list结构，list中存储的是SampleDataItem对象
    goldApi.defineMapProperty(this, "sample_obj_list", {
        parse: function (text) {
            return new SampleDataItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });

    // 定义一个存储string的list
    goldApi.defineMapProperty(this, "sample_string_list");
    // 定义一个存储string的变量
    goldApi.defineProperty(this, "sample_string");

    // 定义一个存储int的变量
    goldApi.defineProperty(this, "sample_int");

    // 3. 经过1和2步，数据结构定义完成，下面需要实现接口方法，所有的数据都存放在sample_data中
}
ApiSample.prototype = {
    // 初始化方法，在使用ApiSample之前，务必要调用一次(而且只能调用一次)，所有的初始化逻辑都放到这里
    init: function() {

    },
    // 添加一个对象到list中的例子
    add_sample_obj_to_list: function() {
        var key = "obj_data_1";
        var sampleData = new SampleDataItem();
        sampleData.sampleData_1 = "sampleData_1_txt";
        sampleData.sampleData_2 = "sampleData_2_txt";
        sampleData.sampleData_3 = "sampleData_3_txt";
        this.sample_obj_list.put(key, sampleData);  // 或者:this.sample_obj_list.set(key, sampleData);
    },
    // 从list中查找对象的例子
    query_sample_obj_from_list: function(key) {
        // 注意，这里传入key，即可以直接查出对应的object，不需要自己转换
        var sampleData = this.sample_obj_list.get(key);
        console.log("get data, sampleData_1 = " + sampleData.sampleData_1 + "; sampleData_2 = " + sampleData.sampleData_2 + "; sampleData_3 = " + sampleData.sampleData_3);
        // 执行自己的业务逻辑
        // 返回数据
    },
    // 添加一个string到list中的例子
    add_sample_string_to_list: function() {
        var key_1 = "string_data_1";
        var value_1 = "sampleString_1_txt";
        this.sample_string_list.set(key_1, value_1);

        var key_2 = "string_data_2";
        var value_2 = "sampleString_2_txt";
        this.sample_string_list.set(key_2, value_2);
    },
    // 从一个list中查找string的例子
    query_sample_string_from_list: function(key) {
        var value = this.sample_string_list.get(key);
        console.log("read key = " + key + "; get value = " + value);
        // 执行自己的业务逻辑
    },
    // 将一个string存储到属性（并保存到localstorage）中
    set_string_to_sample_string: function(value) {
        // 直接给变量赋值,并且存储到localstorage
        this.sample_string = value;
    },
    // 从属性(localstorage)中读取值
    get_sample_string_value: function() {
        console.log("this.sample_string = " + this.sample_string);
        return this.sample_string;
    },
};

window.ApiSample = ApiSample;
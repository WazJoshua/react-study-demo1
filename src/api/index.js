/*
包含应用中所有请求函数的模块
* */

import ajax from './ajax'
import jsonp from "jsonp";

//登录
export const reqLogin = (userCode, password) => ajax('/login', {userCode, password}, 'POST')

export const getTeacherList = () =>ajax('/getAllTeacher',{},'GET')


/*
* jsonp请求的接口函数
* */

/*
export const reqWeather = (citycode) => {

    const url = `http://api.map.baidu.com/weather/v1/?district_id=${citycode}&data_type=all&output=json&ak=B5ORXn5VUuw82hCgDQAYlBfsURQCwEpi`

    jsonp(url, "callback", (err, data) => {
        console.log('jsonp()', err, data)
    })
}
reqWeather(370103)*/

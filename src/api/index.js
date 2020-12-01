/*
包含应用中所有请求函数的模块
* */

import ajax from './ajax'
import jsonp from "jsonp";

//登录
export const reqLogin = (userCode, password) => ajax('/login', {userCode, password}, 'POST')

/*export const getStudent = (userCode) => ajax('/getStudent', {userCode}, 'POST')

//export const getTeacherMSG = (userCode) => ajax('/getTeacher', {userCode}, 'POST')*/

export const getTeacherList = () => ajax('/getAllTeacher', {}, 'GET')

export const getMyDirections = (teacherId) =>ajax('/getMyDirection',{teacherId},'POST')

export const updateStudentInfo = (usercode, password, newpassword, email, direction) => ajax('/updateSInfo', {
    usercode,
    password,
    newpassword,
    email,
    direction
}, 'POST')

//export const selectTeacher = (teacherId) =>ajax('/studentselectteacher',{teacherId},'POST')

export const selectTeacher = (teacherId, studentId) => {
    const url = `http://localhost:7936/studentselectteacher?teacherId=${teacherId}&studentId=${studentId}`
    jsonp(url, "callback", (err, data) => {
        console.log('jsonp()', err, data)
    })
}
export const unselectTeacher = (teacherId, studentId) => {
    const url = `http://localhost:7936/unselectTeacher?teacherId=${teacherId}&studentId=${studentId}`
    jsonp(url, "callback", (err, data) => {
        console.log('jsonp()', err, data)
    })
}


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

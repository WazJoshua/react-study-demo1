/*
包含应用中所有请求函数的模块
* */

import ajax from './ajax'
import jsonp from "jsonp";

const BASE = '/api'

//登录
export const reqLogin = (userCode, password) => ajax(BASE + '/login', {userCode, password}, 'POST')

/*export const getStudent = (userCode) => ajax('/getStudent', {userCode}, 'POST')

//export const getTeacherMSG = (userCode) => ajax('/getTeacher', {userCode}, 'POST')*/

export const getTeacherList = () => ajax(BASE + '/getAllTeacher', {}, 'GET')

export const getMyDirections = (teacherId) => ajax(BASE + '/getMyDirection', {teacherId}, 'POST')

export const updateStudentInfo = (usercode, password, newpassword, email, direction) => ajax(BASE + '/updateSInfo', {
    usercode,
    password,
    newpassword,
    email,
    direction
}, 'POST')

export const updateTeacherInfo = (usercode, password, newpassword, email) => ajax(BASE + '/updateTInfo', {
    usercode,
    password,
    newpassword,
    email,
}, 'POST')


export const addDirections = (directionDescription, directionTeacherId) => ajax(BASE + "/addDirection", {
    directionDescription,
    directionTeacherId
}, 'POST')

export const deleteDirections = (directionId) => ajax(BASE + '/deleteDirection', {directionId}, 'POST')

export const updateDirection = (directionId, directionDescription) => ajax(BASE + '/updateDirection', {
    directionId,
    directionDescription
}, 'POST')

export const getMyStudents = (teacherId) => ajax(BASE + '/getMyStudents', {teacherId}, 'POST')

export const confirmStudent = (studentId, teacherId) => ajax(BASE + '/confirmStudent', {studentId, teacherId}, 'POST')

export const getAllStudents = () => ajax(BASE + '/getAllStudents', {}, 'GET')

export const selectTeacher = (teacherId, studentId) => {
    const url = `http://localhost:7936/api/studentselectteacher?teacherId=${teacherId}&studentId=${studentId}`
    jsonp(url, "callback", (err, data) => {
        console.log('jsonp()', err, data)
    })
}
export const unselectTeacher = (teacherId, studentId) => {
    const url = `http://localhost:7936/api/unselectTeacher?teacherId=${teacherId}&studentId=${studentId}`
    jsonp(url, "callback", (err, data) => {
        console.log('jsonp()', err, data)
    })
}


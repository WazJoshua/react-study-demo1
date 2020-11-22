/*
包含应用中所有请求函数的模块
* */

import ajax from './ajax'

//登录
export const reqLogin = (userCode, password) => ajax('/login', {userCode, password}, 'POST')
/*
能发布异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1.优化1:统一处理请求异常
    在外层包一个自己创建的promise对象
    在请求出错的时不reject(reason)
2.优化2:
        异步得到的不是response,而是response的data
        在请求成功resolve时:resolve(response.data)
*/

import axios from 'axios'
import {message} from "antd";

export default function ajax(url, data = {}, type = 'GET') {

    return new Promise((resolve, reject) => {
        let promise;
        //1.异步执行ajax请求
        if (type === 'GET') {  //发get请求
            promise = axios.get(url, {
                params: {
                    data           //指定请求参数
                }
            });
        } else if (type === 'POST') {
            promise = axios.post(url, data);
        }

        //2.如果成功了,调用resolve(value)
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            //3.如果失败了,不调用reject(reason),而是提示异常信息
            message.error("出错啦!" + error.message)
        })

    })

}

//请求登录

//ajax('/login', {userCode:'20181001',password:'123'},'POST').then()
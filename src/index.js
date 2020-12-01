import React from 'react'
import ReactDom from 'react-dom'
//import 'antd/dist/antd.min.css'
//import 'antd/dist/antd.min'

import App from './App'
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

/*
* 入口js
* */

//读取local中保存的user,保存到内存中

const user = storageUtils.getUser();
const usermsg=storageUtils.getUserMsg();
memoryUtils.user = user
memoryUtils.usermsg=usermsg

//将App组件标签渲染到index页面的div上
ReactDom.render(<App></App>, document.getElementById('root'))

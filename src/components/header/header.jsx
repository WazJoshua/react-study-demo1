import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from "antd";

import './header.less'
import {formatDate} from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {menuListTeacher,menuListStudent} from "../../config/menuConfig";
import LinkButton from "../link-button/link-button";

/*
* header组件
* */
class Header extends Component {

    state = {
        currentTime: formatDate(Date.now()),            //当前时间字符串
    }

    getTime = () => {
        //每隔0.5秒获取当前时间
        this.intervalId = setInterval(() => {
            const currentTime = formatDate(Date.now())
            this.setState({currentTime})
        }, 500)
    }

    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname
        //console.log(path)
        let title
        menuListStudent.forEach(item => {
            if (item.key === path) {        //如果当前item.key等于path,则表示匹配到了
                title = item.title
            } else if (item.children) {
                //在所有的子item里匹配
                const citem = item.children.find(citem => citem.key === path)
                //如果有值说明匹配
                if (citem) {
                    //取出title
                    title = citem.title
                }
            }
        })
        menuListTeacher.forEach(item => {
            if (item.key === path) {        //如果当前item.key等于path,则表示匹配到了
                title = item.title
            } else if (item.children) {
                //在所有的子item里匹配
                const citem = item.children.find(citem => citem.key === path)
                //如果有值说明匹配
                if (citem) {
                    //取出title
                    title = citem.title
                }
            }
        })
        return title
    }

    logout = () => {
        Modal.confirm({
            title: "确认退出系统?",
            content: "",
            onOk: () => {
                //删除保存的user
                storageUtils.removeUser()
                memoryUtils.user = {}
                //跳转到login页面
                this.props.history.replace('/login')
            },
        })
    }


    /**
     * 第一次render后执行一次,
     * 一般在此启动异步操作:发ajax请求和启动定时器
     */
    componentDidMount() {
        this.getTime()
    }

    /*
    * 当前组件被卸载之前调用
    * */
    componentWillUnmount() {
        //清除定时器
        clearInterval(this.intervalId)
    }

    render() {
        const {currentTime} = this.state
        const username = memoryUtils.user.username
        const userrole = memoryUtils.user.userRole
        const currentTitle = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}{(userrole === 3 || userrole === 2 || userrole === 1) ? "老师" : "同学"}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{currentTitle}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src="" alt="weatherimage"/>
                        <span>weather</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
import React, {Component} from 'react'
import {Link} from "react-router-dom";


import './left-nav.less'
import logo from '../../assets/images/logo2.png'
import LeftNavMenu from "./menu/left-nav-menu";

/*
* 左侧导航的组件
* */
 export default class LeftNav extends Component {

    render() {
        return (
            <div to='/' className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>导师双选系统</h1>
                </Link>
                <LeftNavMenu/>
            </div>
        )
    }
}
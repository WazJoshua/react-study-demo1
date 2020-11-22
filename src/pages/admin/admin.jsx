import React, {Component} from 'react'
import memoryUtils from "../../utils/memoryUtils";
import {Redirect} from "react-router-dom";


import {Layout, Menu, Breadcrumb} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

/*
管理的路由组件
 */

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        //如果内存中没有user,说明没有登录
        if (!user || !user.userId) {
            //自动跳转到登录界面(在render()中)
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider style={{color:'#996699'}}>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )

    }
}
import React, {Component} from 'react'

import {Switch, Route, Redirect} from "react-router-dom";


import {Layout} from 'antd';

import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
import Home from "../home/home";
import PersonalInfo from "../personal-info/personal-info";
import TeacherList from "../teacher-list/teacher-list";
import StudentList from "../student-list/student-list";
import ConfirmStudentList from "../student-list/confirm-student-list";
import Direction from "../direction/direction";
import ManageSystem from "../manage-system/manage-system";
import ManageTeacher from "../manage-teacher/manage-teacher";
import ManageStudent from "../manage-student/manage-student";

const {Content, Footer, Sider} = Layout;

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
                <Sider style={{backgroundColor: '#fff'}}>    {/*style={{backgroundColor: '#6a286a'}}*/}
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin: 22, backgroundColor: '#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/info' component={PersonalInfo}/>
                            <Route path='/teacher' component={TeacherList}/>
                            <Route path='/tosel' component={StudentList}/>
                            <Route path='/confirmstudent' component={ConfirmStudentList}/>
                            <Route path='/direction' component={Direction}/>
                            <Route path='/managesystem' component={ManageSystem}/>
                            <Route path='/manageteacher' component={ManageTeacher}/>
                            <Route path='/managestudent' component={ManageStudent}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#a59e9e'}}>@嘉爷爷</Footer>
                </Layout>
            </Layout>
        )

    }
}
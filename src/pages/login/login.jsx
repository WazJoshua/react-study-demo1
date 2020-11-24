import React, {Component} from 'react'
import {Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Redirect} from "react-router-dom";
import './login.less'
import {reqLogin} from '../../api'

import logo from '../../assets/images/logo.png'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

/*
登陆的路由组件
 */

export default class Login extends Component {

    onFinish = async (values) => {
        //values.preventDefault()
        //console.log('提交登陆的ajax请求 ', values);
        //请求登录
        const {userCode, password} = values
        /*reqLogin(userCode, password).then(response => {
            console.log("成功了!", response.data)
        }).catch(error => {
            console.log("失败了!", error)
        })*/
        /*try{
            const response = await reqLogin(userCode, password);
            console.log("请求成功!", response.data)
        }catch (error){
            console.log("请求失败!",error)
        }*/
        const result = await reqLogin(userCode, password);
        //console.log('请求成功',response.data)
        //const result = response.data;

        if (result.code === 200) {
            //提示登陆成功
            message.success(result.msg)
            //console.log(result)

            const user = result.user
            memoryUtils.user = user //保存在内存中
            storageUtils.saveUser(user) //保存在local
            //console.log(user)
            //跳转到指定页面(不需要再回退回来,需要回退要.push())
            this.props.history.replace('/')
        } else {
            message.error(result.msg)
        }


    };

    render() {

        /*
        判断用户是否登录
        */
        const user = memoryUtils.user;
        if (user && user.userId) {
            return <Redirect to='/'></Redirect>
        }
        return (
            <div className="login">
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>导师双选系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        /*initialValues={{remember: true}}*/
                        onFinish={this.onFinish}
                        /*onSubmit={this.handleSubmit}*/
                    >
                        <   Form.Item
                            name="userCode"
                            rules={[{
                                required: true,
                                message: '请输入学号!'
                            }, {
                                type: "string",
                                max: 12,
                                min: 0,
                                message: '请输入正确的学号!'
                            }, {
                                pattern: /^[0-9]+$/,
                                message: '学号为纯数字!'
                            }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="学号"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{
                                required: true,
                                message: '请输入密码!'
                            }, {
                                type: "string",
                                max: 16,
                                message: "密码长度不超过16位"
                            }, {
                                type: "string",
                                min: 0,
                                message: "密码长度不小于0位"
                            }

                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/*
1.前台表单验证
2.收集表单数据
 */

/*
* async和await
*
* 1.作用?
*   简化promise对象的使用,不再使用then来指定成功/失败的回调函数
*   同步编码(没有回调函数课)方式,实现异步流程
* 2.哪里写await
*   在返回promise表达式的左侧写await:不想要promise,像要promise异步执行成功的value数据
* 3.哪里写async
*   await所在函数(最近的)定义的左侧
* */




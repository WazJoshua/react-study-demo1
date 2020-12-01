import React, {Component} from 'react'
import {Form, Input, InputNumber, Button, message} from 'antd';

import './personal-info.less'
import memoryUtils from "../../utils/memoryUtils";
import {updateStudentInfo} from '../../api'
import storageUtils from "../../utils/storageUtils";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '请输入${label}!',
    types: {
        email: '请输入正确的${label} !',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const onFinish = async values => {
    //console.log(values);
    const user = values.user
    let usermsg = memoryUtils.usermsg
    const result = await updateStudentInfo(memoryUtils.user.userCode, user.password, user.newpassword, user.email, user.direction);
    //console.log(result)
    if (result.code === 200) {
        message.success(result.msg);
        usermsg.studentEmail = user.email
        usermsg.personalDirection = user.direction
        memoryUtils.usermsg = usermsg
        storageUtils.saveUserMsg(usermsg)

    } else {
        message.error(result.msg);
    }
};
/*
* 个人信息路由
* */
export default class PersonalInfo extends Component {
    render() {
        if (memoryUtils.user.userRole === 4) {      //学生的info
            return (
                <div>
                    <div className="info-form">
                        <Form {...layout} name="nest-messages" onFinish={onFinish} layout="horizontal"
                              validateMessages={validateMessages}>

                            <Form.Item
                                initialValue={memoryUtils.usermsg.studentEmail}
                                name={['user', 'email']}
                                label="邮箱"
                                rules={[
                                    {
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item name={['user', 'newpassword']} label="修改密码">
                                <Input type='password'/>
                            </Form.Item>
                            <Form.Item name={['user', 'direction']} label="个人期望方向"
                                       initialValue={memoryUtils.usermsg.personalDirection}>
                                <Input.TextArea/>
                            </Form.Item>
                            <Form.Item

                                name={['user', 'password']}
                                label="当前密码"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input type='password'/>
                            </Form.Item>
                            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            )
        } else if (memoryUtils.user.userRole === 3) {       //这里写老师的info
            return (<div>
                teacherinfo
            </div>)
        }
    }
}
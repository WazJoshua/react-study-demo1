import React, {Component} from 'react'
import memoryUtils from "../../utils/memoryUtils";

import student from './img/student.png'
import teacher from './img/teacher.png'
import './home.less'
/*
* 首页路由
* */
export default class Home extends Component {
    render() {
        if (memoryUtils.user.userRole === 3) {
            return (
                <div className='main-text'>
                    <h1>主要流程</h1>
                    <img className='image-program' src={teacher}/>
                </div>
            )
        } else if (memoryUtils.user.userRole === 4) {
            return (
                <div className='main-text'>
                    <h1>主要流程</h1>
                    <img className='image-program' src={student}/>
                </div>
            )
        }
        else return (
            <div>主要流程</div>
            )


    }
}
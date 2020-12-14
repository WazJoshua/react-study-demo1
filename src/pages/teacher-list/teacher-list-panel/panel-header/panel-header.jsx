import React from 'react'
import {Button, message} from "antd";

import './panel-header.less'
import {selectTeacher, unselectTeacher} from '../../../../api/index'
import memoryUtils from "../../../../utils/memoryUtils";
import storageUtils from "../../../../utils/storageUtils";


export default class PanelHeader extends React.Component {

    constructor(props) {
        super(props);

        const usermsg = memoryUtils.usermsg;
        console.log(usermsg)
        if (usermsg.isSelected == 1&&this.props.props.teacherId === usermsg.teacherId) {
            this.state = {
                buttonText: "老师已确认",
                usermsg: usermsg,
                disable: true
            }
        }else if (this.props.props.teacherId === usermsg.teacherId) {
            this.state = {
                buttonText: '取消',
                usermsg: memoryUtils.usermsg,
                disable: false
            }
        } else {
            this.state = {
                buttonText: '选择',
                usermsg: memoryUtils.usermsg,
                disable: false
            }
        }
    }

    studentselectTeacher(teacherId, studentId, e) {

        if (this.state.buttonText === '选择') {
            if (this.state.usermsg.teacherId != null) {
                message.error("你已经选择了导师!")
                e.preventDefault()
                return
            }
            this.setState({buttonText: '取消'})
            selectTeacher(teacherId, studentId)
            this.props.props.selNums++
            this.state.usermsg.teacherId = teacherId
            storageUtils.saveUserMsg(this.state.usermsg)
            memoryUtils.usermsg = this.state.usermsg

        } else if (this.state.buttonText === '取消') {
            this.setState({buttonText: '选择'})
            unselectTeacher(teacherId, studentId)
            this.props.props.selNums--
            this.state.usermsg.teacherId = null
            //storageUtils.removeUserMsg()
            memoryUtils.usermsg = this.state.usermsg
            storageUtils.saveUserMsg(this.state.usermsg)
        } else {
            message.error("老师已经确认,无法取消!")
            e.preventDefault()
            return
        }
    }

    render() {
        return (

            <div className="panel-header">
                <div><span>{this.props.props.teacherName}</span></div>
                <div className="select-person">已选人数{this.props.props.selNums}/{this.props.props.maxNums}</div>
                <div className="select-person">已确定人数{this.props.props.confirmNums}/{this.props.props.maxNums}</div>
                <div onClick={e => e.stopPropagation()} className="select-button">
                    <Button type="primary"
                            onClick={this.studentselectTeacher.bind(this, this.props.props.teacherId, memoryUtils.user.userId)}>{this.state.buttonText}</Button>
                </div>
            </div>
        )
    }


}
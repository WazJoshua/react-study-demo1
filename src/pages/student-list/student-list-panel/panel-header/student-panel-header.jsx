import React from 'react'

import {Button, message} from "antd";
import {confirmStudent} from "../../../../api";

import './student-panel-header.less'
import memoryUtils from "../../../../utils/memoryUtils";
import storageUtils from "../../../../utils/storageUtils";

export default class StudentPanelHeader extends React.Component {

    constructor(props) {
        super(props);
        //console.log(this.props.student)
        if (this.props.student.isSelected == 1) {
            this.state = {
                buttonU: true,
                buttonText: "已选择不可取消"
            }
        } else {
            this.state = {
                buttonU: false,
                buttonText: "选择"
            }
        }

    }


    selectStudent = (studentId, e) => {
        if (memoryUtils.usermsg.maxNums === memoryUtils.usermsg.confirmNums||memoryUtils.usermsg.maxNums < memoryUtils.usermsg.confirmNums) {
            message.error("已达到最高选择学生数!")
            e.preventDefault();
            return
        } else {
            this.setState({buttonU: true, buttonText: "已选择不可取消"})
            confirmStudent(studentId, memoryUtils.usermsg.teacherId)
            memoryUtils.usermsg.confirmNums++
            storageUtils.saveUserMsg(memoryUtils.usermsg)
        }
    }

    render() {
        return (
            <div className='panel-header'>
                {this.props.student.studentName}
                <Button className='confirm-button' type='primary' disabled={this.state.buttonU}
                        onClick={this.selectStudent.bind(this, this.props.student.studentId)}>{this.state.buttonText}</Button>
            </div>
        )
    }


}
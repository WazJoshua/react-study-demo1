import React, {Component} from 'react'
import {Collapse, message} from 'antd';


import {getMyStudents} from '../../api'
import TeacherListPanel from "../teacher-list/teacher-list-panel/teacher-list-panel";
import StudentPanel from "./student-list-panel/student-panel";
import memoryUtils from "../../utils/memoryUtils";

/*
* 老师列表路由
*/
export default class StudentList extends Component {

    state = {
        studentsList: []
    }

    getStudent = async () => {
        const result = await getMyStudents(memoryUtils.usermsg.teacherId);
        if (result.code === 200) {
            const studentsList = result.mystudents;
            this.setState({
                studentsList
            })
        } else {
            message.error("获取失败,请稍后重试!")
        }
    }

    renderStudentIntoPage = (studentList) => {
        //console.log(studentList)
        if (studentList === undefined)
            return;
        return studentList.map(item => {
            if (!studentList.teacherId) {
                return <StudentPanel item={item}/>
            }
        })
    }

    componentDidMount() {
        this.getStudent()
    }


    render() {

        return (
            <div>
                <Collapse accordion>
                    {this.renderStudentIntoPage(this.state.studentsList)}
                </Collapse>
            </div>
        )
    }
}
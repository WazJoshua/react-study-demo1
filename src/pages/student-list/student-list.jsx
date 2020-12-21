import React, {Component} from 'react'
import {Table, Collapse, message, Pagination} from 'antd';


import {getMyStudents} from '../../api'
import TeacherListPanel from "../teacher-list/teacher-list-panel/teacher-list-panel";
import StudentPanel from "./student-list-panel/student-panel";
import memoryUtils from "../../utils/memoryUtils";

/*
* 老师列表路由
*/


export default class StudentList extends Component {

    state = {
        studentsList: [],
        minValue: 0,
        maxValue: 4
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
        return studentList/*.slice(this.state.minValue, this.state.maxValue)*/.map(item => {
            if (!studentList.teacherId) {
                return <StudentPanel item={item}/>
            }
        })
    }

    componentDidMount() {
        this.getStudent()
    }

    handleChange = value => {
        console.log(value===1)
        if (value === 1) {
            const minValue = 0
            const maxValue = 4
            this.setState({
                minValue,
                maxValue
            })
        } else {
            const minValue = (value - 1) * 4
            const maxValue = minValue + 4
            this.setState({
                minValue,
                maxValue
            })
            console.log("翻页", this.state.minValue, this.state.maxValue)
        }
    }


    render() {

        return (
            <div>

                <Collapse accordion>
                    {this.renderStudentIntoPage(this.state.studentsList)}
                </Collapse>
                {/*<Pagination onChange={this.handleChange} defaultCurrent={1} defaultPageSize={4}
                            total={this.state.studentsList.length}/>*/}
            </div>
        )
    }
}
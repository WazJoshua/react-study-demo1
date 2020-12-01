import React, {Component} from 'react'
import {Collapse, message} from 'antd';


import {getTeacherList} from '../../api'
import TeacherListPanel from "./teacher-list-panel/teacher-list-panel";

/*
* 老师列表路由
*/
export default class TeacherList extends Component {

    state = {
        teachers: []
    }

    getTeacher = async () => {
        const result = await getTeacherList();

        if (result.code === 200) {
            const teachers = result.teachers;
            this.setState({
                teachers
            })
        } else {
            message.error("获取失败,请稍后重试!")
        }
    }

    renderTeachersIntoPage = (teachers) => {

        return teachers.map(item => {
            if (!teachers.teacherId) {
                return <TeacherListPanel item={item}></TeacherListPanel>
            } else this.renderTeachersIntoPage()
        })
    }

    componentDidMount() {

        this.getTeacher()
        //this.renderTeachersIntoPage()
    }


    render() {

        return (
            <div>
                <Collapse accordion>
                    {this.renderTeachersIntoPage(this.state.teachers)}
                </Collapse>
            </div>
        )
    }
}
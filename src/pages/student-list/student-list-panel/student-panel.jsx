import React from 'react'

import {Collapse} from 'antd';

import './student-panel.less'
import PanelHeader from "./panel-header/student-panel-header";

const {Panel} = Collapse;

export default class StudentPanel extends React.Component {

    constructor(props) {
        super(props);

        //console.log("studentPanel", props)
        this.state = {
            student: this.props.item
        }
    }

    render() {
        return (
            <Panel className="student-list-panel" {...this.props} header={<PanelHeader student={this.props.item}/>}>
                <h1 className="title">学生信息</h1>{this.state.student.studentName}<p className="panel-info">{this.state.student.personalDirection}</p>
            </Panel>
        )

    }


}

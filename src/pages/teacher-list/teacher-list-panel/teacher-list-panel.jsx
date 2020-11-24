import React, {Component} from 'react'

import {Collapse, message} from 'antd';

import './teacher-list-panel.less'
import PanelHeader from "./panel-header/panel-header";

const {Panel} = Collapse;

export default function TeacherListPanel(props) {

    const teacher = props.item

    function intoDirection(directions) {
        return directions.map(item => {
            if (!directions.directionId) {
                return <p className="panel-direction">directions</p>
            }
        })
    }

    return (
        <Panel className="teacher-list-panel" {...props} header={<PanelHeader props={teacher}/>}
               key={teacher.teacherId}>

            <p className="panel-directions">{intoDirection(teacher.directions)}</p>
        </Panel>
    )

}
import React, {Component} from 'react'

import {Button, Collapse, message} from 'antd';

import './teacher-list-panel.less'
import PanelHeader from "./panel-header/panel-header";

const {Panel} = Collapse;

export default function TeacherListPanel(props) {

    const teacher = props.item

    function intoDirection(directions) {
        return directions.map(item => {
            if (!directions.directionId) {
                return <p className="panel-direction">{item.directionDescription}</p>
            }
        })
    }

    return (
        <Panel className="teacher-list-panel" {...props} /*extra={<Button type="primary">选择</Button>}*/
               header={<PanelHeader props={teacher}/>}>

            <h1 className="title">导师方向</h1><p className="panel-directions">{intoDirection(teacher.directions)}</p>
        </Panel>
    )

}
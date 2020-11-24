import React, {Component} from 'react'

import './panel-header.less'

export default function PanelHeader (props) {



        return (

            <div className="panel-header">
                <p>{props.props.teacherName}</p>
                <button className="select-button">选择</button>
            </div>
        )
}
import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom"
import {Menu} from 'antd';
import memoryUtils from "../../../utils/memoryUtils";
import {menuListAdmin, menuListStudent, menuListTeacher} from "../../../config/menuConfig";

const {SubMenu} = Menu;

class LeftNavMenu extends Component {
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            /*
            *{
            *   title:""    //菜单标题名
            *   key:""      //对应的path
            *   icon:""     //图标名
            *   children:[] //可能有
            *}
            *
            * */
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }


        })
    }

    render() {
        const path = this.props.location.pathname
        if (memoryUtils.user.userRole === 3) {
            return (
                <div>
                    <Menu
                        selectedKeys={[path]}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="light"
                    >
                        {this.getMenuNodes(menuListTeacher)}
                    </Menu>
                </div>
            )
        } else if (memoryUtils.user.userRole === 4) {
            return (
                <div>
                    <Menu
                        selectedKeys={[path]}
                        mode="inline"
                        theme="light"
                    >
                        {this.getMenuNodes(menuListStudent)}
                    </Menu>
                </div>
            )
        }else {
            //管理员界面
            return (<div>
                <Menu
                    selectedKeys={[path]}
                    mode="inline"
                    theme="light"
                >
                    {this.getMenuNodes(menuListAdmin)}
                </Menu>
            </div>)
        }


    }
}

export default withRouter(LeftNavMenu)

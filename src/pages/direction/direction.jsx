import React, {Component} from 'react'
import {Card, Table, Input, Tag, Space, Modal, Button, Form} from 'antd';
import {PlusOutlined} from '@ant-design/icons'


import {getMyDirections} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import './directions.less'

const {TextArea} = Input;

const ModalInput = (props) => {
    //console.log("modal",props)
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        //setModalText('The modal will be closed after two seconds');
        //setConfirmLoading(true);
    };

    const handleCancel = () => {
        //console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {props.title}
            </Button>
            <Modal
                title={props.title}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item>
                        <Input.TextArea defaultValue=''/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default class Direction extends Component {

    state = {
        directions: [],
    }
    initColumns = () => {
        this.columns = [
            {
                title: '编号',
                dataIndex: 'directionId'
            },
            {
                title: '内容',
                dataIndex: 'directionDescription'
            },
            {
                title: '操作',
                width: 300,
                render: () => (
                    <span>
                        <ModalInput title='编辑'></ModalInput>
                        <Button type='primary' className='delete-button'>删除</Button>
                    </span>
                )
            }
        ]
    }

    getDirections = async () => {
        const result = await getMyDirections(memoryUtils.usermsg.teacherId);
        this.setState({directions: result.mydirections})
        //console.log("this.state", this.state.directions)
    }

    componentDidMount() {
        this.getDirections()
        this.initColumns()
    }

    render() {
        const extra = (
            <div>
                <ModalInput title="添加" reqUrl='/addDirection'></ModalInput>
            </div>
        )
        const direcions = this.state.directions
        return (
            <div>
                <Card title="论文方向管理" extra={extra}>
                    <Table columns={this.columns} dataSource={direcions}></Table>
                </Card>
            </div>
        )
    }
}
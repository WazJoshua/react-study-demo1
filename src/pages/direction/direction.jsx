import React, {Component} from 'react'
import {Input, Modal, Card, Popconfirm, Table, Button, Form} from 'antd';

import {getMyDirections, deleteDirections, addDirections, updateDirection} from "../../api";
//import ModalInput from "./modal-input/modal-input";
import memoryUtils from "../../utils/memoryUtils";
import './directions.less'

const {TextArea} = Input;

const ModalInput = (props) => {

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = (values) => {
        //console.log("handleok",values)
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 850);
    };

    const handleCancel = () => {
        //console.log('Clicked cancel button');
        setVisible(false);
    };

    const addDirection = (values) => {
        //console.log("addDirection", values)
        setConfirmLoading(true);
        addDirections(values.directionDescription, memoryUtils.usermsg.teacherId)
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
            window.location.reload()
        }, 850);

    }

    const updateDir = (values) => {
        updateDirection(props.direction.directionId,values.directionDescription)
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
            window.location.reload()
        }, 850);
    }

    if (props.direction != null) {
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
                    footer={null}
                >
                    <Form onFinish={updateDir}>
                        <Form.Item
                            name={["directionDescription"]}
                            initialValue={props.direction.directionDescription}
                        >
                            <TextArea/>
                        </Form.Item>
                        <Form.Item>
                            <div className='ant-modal-footer'>
                                <Button type='primary' htmlType='submit'>确认</Button>
                                <Button onClick={handleCancel.bind()}>取消</Button>
                            </div>
                        </Form.Item>
                    </Form>

                </Modal>
            </>
        );
    } else {
        return (<>
            <Button type="primary" onClick={showModal}>
                {props.title}
            </Button>
            <Modal
                title={props.title}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose={true}
                footer={null}
            >
                <Form onFinish={addDirection}>
                    <Form.Item
                        name={["directionDescription"]}
                        rules={[
                            {
                                required: true,
                                message: "请输入内容!"
                            }
                        ]
                        }
                    >
                        <TextArea/>
                    </Form.Item>
                    <Form.Item>
                        <div className='ant-modal-footer'>
                            <Button type='primary' htmlType='submit'>确认</Button>
                            <Button onClick={handleCancel.bind()}>取消</Button>
                        </div>
                    </Form.Item>
                </Form>

            </Modal>
        </>)
    }


};

export default class Direction extends Component {

    state = {
        directions: [],
    }

    deleteDir = (values, e) => {
        var del = deleteDirections(values.directionId);
        //console.log('delete', del)
        this.props.history.go(0)
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
                render: (text, record) => (
                    <span>
                        <ModalInput title='编辑' direction={text}/>
                        <Button type='primary' className='delete-button'>
                            <Popconfirm title="确认删除?" cancelText='取消' okText='确认'
                                        onConfirm={this.deleteDir.bind(this, text)}>
                                <a>删除</a>
                            </Popconfirm>
                        </Button>
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

        const direcions = this.state.directions
        const extra = (
            <div>
                <ModalInput title="添加"/>
            </div>
        )
        return (
            <div>
                <Card title="论文方向管理" extra={extra}>
                    <Table columns={this.columns} dataSource={direcions}/>
                </Card>
            </div>
        )
    }
}
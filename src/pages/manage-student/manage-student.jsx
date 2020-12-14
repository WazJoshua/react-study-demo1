import React from 'react'

import {Input, InputNumber, message, Table, Tag, Space, Button, Modal, Form, Radio} from "antd";

import {addDirections, getAllStudents, updateDirection} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import './manage-student.less'

const {TextArea} = Input;

const ModalInput = (props) => {

    console.log(props.des)

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


    const [value, setValue] = React.useState(1);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onFinish = values => {
        console.log('onfinish',values);
    };
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
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
                    <Form onFinish={onFinish}>
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
                <Form {...layout} name="nest-messages" onFinish={onFinish}>
                    <Form.Item initialValue={props.des.studentName} name={['student', 'name']} label="学生姓名"
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item initialValue={props.des.teacherId} name={['student', 'teacherid']} label="老师id"
                               rules={[{}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item initialValue={props.des.studentEmail} name={['student', 'email']} label="邮箱"
                               rules={[{type: 'email'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item initialValue={props.des.personalDirection} name={['student', 'direction']} label="学生方向">
                        <TextArea/>
                    </Form.Item>
                    <Form.Item>
                        <Radio.Group className="radio-select" onChange={onChange} value={value}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </>)
    }


};

export default class ManageStudent extends React.Component {

    state = {
        students: []
    }

    columns = [
        {
            title: '学号',
            dataIndex: 'userCode',
            key: 'userCode',

        },
        {
            title: '学生姓名',
            dataIndex: 'studentName',
            key: 'studentName',

        },
        {
            title: '选择老师编号',
            dataIndex: 'teacherId',
            key: 'teacherId',
        },
        {
            title: '学生邮箱',
            dataIndex: 'studentEmail',
            key: 'studentEmail',
        },
        {
            title: '个人方向',
            dataIndex: 'personalDirection',
            key: 'personalDirection',
        },
        {
            title: '是否已被老师选择',
            dataIndex: 'isSelected',
            key: 'isSelected',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/*<Button onClick={this.clickButton.bind(this, text)} type='primary'>编辑</Button>*/}
                    <ModalInput title="编辑" des={text}/>
                </Space>
            ),
        },
    ];

    getStudents = async () => {
        const result = await getAllStudents();
        if (result.code === 200) {
            const students = result.students;
            this.setState({
                students
            })
        } else {
            message.error("获取失败,请稍后重试!")
        }
    }

    componentDidMount() {
        this.getStudents()
    }

    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.state.students}
                       pagination={{hideOnSinglePage: true, pageSize: 6}}/>
            </div>
        )
    }
}
import {
    ProfileOutlined,
    UnorderedListOutlined,
    HomeOutlined,
    SnippetsOutlined,
    HddOutlined,
} from '@ant-design/icons';

export const menuListTeacher = [
    {
        title: "首页",
        key: "/home",
        icon: <HomeOutlined/>
    },
    {
        title: "候选学生列表",
        key: "/tosel",
        icon: <UnorderedListOutlined/>,
    },
    {
        title: "信息设置",
        key: 'sub',
        icon: <HddOutlined/>,
        children: [
            {
                title: "个人信息",
                key: "/info",
                icon: <ProfileOutlined/>,
            },
            {
                title: "论文方向管理",
                key: "/direction",
                icon: <SnippetsOutlined/>,
            },
            {
                title: "已选学生列表",
                key: "/confirmstudent",
                icon: <HomeOutlined/>,
            },

        ]
    }

]
export const menuListStudent = [
    {
        title: "首页",
        key: "/home",
        icon: <HomeOutlined/>
    },
    {
        title: "个人信息",
        key: "/info",
        icon: <ProfileOutlined/>,
    },
    {
        title: "导师列表",
        key: "/teacher",
        icon: <UnorderedListOutlined/>,
    }
]


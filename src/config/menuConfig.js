import {
    ProfileOutlined,
    UnorderedListOutlined,
    HomeOutlined,
    SnippetsOutlined,
    HddOutlined, FundOutlined, TeamOutlined, BookOutlined,
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

export const menuListAdmin=[
    {
        title:'系统设置',
        key:'/managesystem',
        icon: <FundOutlined />,
    },
    {
        title:'学生管理',
        key:'/managestudent',
        icon: <TeamOutlined />,
    },
    {
        title:'老师管理',
        key:'/manageteacher',
        icon: <BookOutlined />,
    }
]


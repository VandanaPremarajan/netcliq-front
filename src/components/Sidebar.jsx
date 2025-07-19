import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Layout, Menu } from 'antd';
import {
  FolderAddOutlined,
  AppstoreAddOutlined,
  VideoCameraAddOutlined,
  UserOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;


const Sidebar = ({ pageName, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const handleLogout = () => {
  localStorage.removeItem('authToken'); 
  localStorage.removeItem('isLoggedIn'); 
  localStorage.removeItem('role'); 
  setIsAuthenticated(false);
  navigate('/admin/login');
}
const handleMenuClick = (e) => {
  if(e.key === 'Logout'){
    modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to logout?',
      onOk() {
        handleLogout();
      },
    });
  }
  };
const items = [
  getItem('Content Management', 'sub1', <FolderAddOutlined />, [
    getItem(<Link to="/admin/Genre">Genre</Link>, 'Genre', <AppstoreAddOutlined />),
    getItem(<Link to="/admin/Content">Content</Link>, 'Content', <VideoCameraAddOutlined />),
  ]),
  getItem('Profile', 'Profile', <UserOutlined />),
  getItem('Logout', 'Logout', <PoweroffOutlined />),
  
];
  
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      {contextHolder}
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="admin_logo">Netcliq</div>
        <Menu theme="dark" defaultSelectedKeys={pageName} mode="inline" items={items} defaultOpenKeys={['sub1']} onClick={handleMenuClick} />
      </Sider>
    </>
  );
}
export default Sidebar;

import React, { useState } from 'react';
import { Layout, Menu, Input, Button, Avatar, Dropdown } from 'antd';
import { SearchOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import './css/SearchAnimation.css';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Navbar = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('isLoggedIn'); 
        localStorage.removeItem('role'); 
        setIsAuthenticated(false);
        navigate('/subscriber/login');
    }

    const items = [
    {
        key: '1',
        label: 'Logout',
        onClick: handleLogout
    },
    {
        key: '2',
        label: 'Profile',
    },
    ];

  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (showSearch) setSearchValue('');
  };


  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingInline: '20px' }}>
      <div><Link className="navbar-brand" to="/subscriber/browse">
            Netcliq
          </Link></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {showSearch && (
          <Input
            size="middle"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={`search-input ${showSearch ? 'fade-in' : 'fade-out'}`}
            style={{ width: 200 }}
          />
        )}

        <Button
          type="primary"
          shape="circle"
          icon={showSearch ? <CloseOutlined /> : <SearchOutlined />}
          onClick={toggleSearch}
        />

        <Dropdown menu={{ items }}>
          <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;

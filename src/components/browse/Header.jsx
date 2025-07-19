import { Avatar, Dropdown } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setIsAuthenticated }) => {
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

    
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/subscriber/browser">
            Netcliq
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/subscriber/browser">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/subscriber/browser">
                  Movies
                </Link>
              </li>
            </ul>
          </div>
           <div className="d-flex">
            <Dropdown menu={{ items }}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Dropdown>
                
            </div>
        </div>
      </nav>
    </>
  );
};
export default Header;

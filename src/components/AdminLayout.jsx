// import Header from "./Header";
// import Dashboard from "./pages/Dashboard";
// import Sidebar from "./Sidebar";

// function AdminLayout({ children }) {
//   return (
//     <>
//       <div className="hold-transition sidebar-mini">
//         <div className="wrapper">
//           <Sidebar></Sidebar>

//           <div id="content-wrapper" className="d-flex flex-column">
//             <div id="content">
//               <Header></Header>
//               <div className="content-wrapper">
//                 {children}
//               </div>
//             </div>
//           </div>

//           <aside className="control-sidebar control-sidebar-dark">
//             {/* Control sidebar content goes here */}
//           </aside>

//           <>
//             {/* Main Footer */}
//             <footer className="main-footer">
//               <strong>
//                 Copyright © 2014-2019{" "}
//                 <a href="http://adminlte.io">AdminLTE.io</a>.
//               </strong>
//               All rights reserved.
//               <div className="float-right d-none d-sm-inline-block">
//                 <b>Version</b> 3.0.3
//               </div>
//             </footer>
//           </>
//         </div>
//       </div>
//     </>
//   );
// }
// export default AdminLayout;

import { Outlet, useLocation } from 'react-router-dom';
import { Breadcrumb, Layout, theme } from 'antd';
import Sidebar from './Sidebar';
import AppFooter from './AppFooter';
const { Header, Content } = Layout;


const AdminLayout = ({ setIsAuthenticated }) => {

  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean); // ['admin', 'genre']
  const pageName = pathSegments[pathSegments.length - 1]; // 'genre'

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Sidebar pageName={pageName} setIsAuthenticated={setIsAuthenticated}></Sidebar>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Content Management' }, { title: pageName }]} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <AppFooter/>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
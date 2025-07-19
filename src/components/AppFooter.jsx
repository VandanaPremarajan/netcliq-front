import { Layout } from 'antd';
const { Footer } = Layout;
const AppFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
          Netcliq ©{new Date().getFullYear()}
        </Footer>
    )
}
export default AppFooter;
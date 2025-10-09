import { Layout } from 'antd';
const { Footer } = Layout;
const AppFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }} className='footer'>
          Netcliq ©{new Date().getFullYear()}
        </Footer>
    )
}
export default AppFooter;
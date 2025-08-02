import { useEffect } from "react";
import { Card, Button, Form, Input, notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { isValidAdmin, isValidSubscriber } from "./services/userService";
import { Token_name } from "./constants/api_settings";
import AppFooter from "./components/AppFooter";

const Login = ({setIsAuthenticated}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect login type from URL
  const isAdminLogin = location.pathname.toLowerCase().includes('/admin/login');
  // const isSubscriberLogin = location.pathname.includes('/subscriber/login');

  const [notify, contextHolder] = notification.useNotification();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setIsAuthenticated(true); 
    }
  }, [setIsAuthenticated]);

  const onFinish = async(values) => {
    try{
      console.log(isAdminLogin)
      const response = isAdminLogin ? await isValidAdmin(values) : await isValidSubscriber(values);
      if(response.data.status === true){
        localStorage.setItem('isLoggedIn', response.data.status);
        localStorage.setItem(Token_name, response.data.accessToken);
        localStorage.setItem('role', response.data.user.role);
        setIsAuthenticated(response.data.status);
        if (isAdminLogin) {
          navigate('/admin/genre');
        } else {
          console.log(123)
          navigate('/subscriber/browse');
        }
      }else{
        console.log("Error");
        notify.error({
          message: "Error",
          description: response.data.error,
          placement: "top",
        });
      }  
    }catch(err){
      console.log("Catch Error 400 "+ err);
      notify.error({
        message: "User doesn't exist",
        description: "Please check the fields and try again",
        placement: "top",
      });
    }

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
    {contextHolder}
      <div className="dark_bg vh-100 position-relative netcliq_bg">
        <div className="container">
          
          <div className="row d-flex justify-content-center pt-5">
            <div className="col-md-4 positon-relation z-1">
              <div className="navbar-brand logo_login mb-4">Netcliq</div>
              <Card title="Login" variant="borderless" style={{ width: "100%" }} className="login_page">
                <Form
                  name="basic"
                  // labelCol={{ span: 8 }}
                  // wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    // label="Email"
                    name="email_address"
                    rules={[
                      { type: 'email', required: true, message: "Please input your email!" },
                    ]} 
                  >
                    <Input placeholder="Email address" />
                  </Form.Item>

                  <Form.Item
                    // label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please input your password!" },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </div>
        </div>
        <div className="position-absolute z-1 bottom-0 w-100">
          <AppFooter /> 
        </div>
        
      </div> 
      
    </>  
  );
};
export default Login;

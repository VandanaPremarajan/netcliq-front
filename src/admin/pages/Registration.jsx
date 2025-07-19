import { Card, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { addAdmin } from "../../services/userService";
import { notification } from "antd";

const Login = () => {
  const [notify, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const ClearFields = () => {
    form.resetFields();
  }
  
  const onFinish = async(values) => {
    const record = {
      ...values,
      user_type: "subscriber", 
      profile_pic: "url"
    }
    try {
      await addAdmin(record);
      notify.success({
        message: 'User Added',
        description: 'The user was added successfully!',
        placement: 'top', 
      });
      ClearFields();
      navigate('/admin/login');
    } catch (err) {
      notify.error({
        message: 'Error',
        description: 'Error occured when adding the record',
        placement: 'top', 
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
     {contextHolder}
      <div className="container">
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-md-6">
            <Card title="Registration" variant="borderless" style={{ width: "100%" }}>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true, message: "Email is required" }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Phone is required" }]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
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
    </>  
  );
};
export default Login;

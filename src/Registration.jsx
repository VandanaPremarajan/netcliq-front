import { useEffect } from "react";
import { Card, Button, Form, Input, notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addAdmin,
  addSubscriber
} from "./services/userService";
import { Token_name } from "./constants/api_settings";
import AppFooter from "./components/AppFooter";
import PhoneInput from "antd-phone-input";

const Login = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect login type from URL
  const isAdminLogin = location.pathname.toLowerCase().includes("/admin/registration");

  const [notify, contextHolder] = notification.useNotification();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  const validatePasswordMatch = (getFieldValue) => (_, value) => {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("The two passwords that you entered do not match!")
    );
  };

  const validatePhone = (_, { valid }) => {
    if (valid()) {
      // Basic validation check
      return Promise.resolve();
    }
    return Promise.reject("Invalid phone number");
  };

  const onFinish = async (values) => {
    try {
      console.log(values);
      const { first_name, last_name, email_address, password } =
        values;
      const { valid, ...phoneWithoutValid } = values.phone_number || {}; // remove "valid"
      const objVal = {
        first_name,
        last_name,
        phone_number: phoneWithoutValid,
        email_address,
        password,
        profile_pic: ""
      };
      console.log(objVal);
      const response = isAdminLogin ? await addAdmin(objVal) : await addSubscriber(objVal);
      if (response.data.status === true) {
        if (isAdminLogin) {
          navigate('/admin/login?registered=true');
        } else {
          navigate('/subscriber/login?registered=true');
        }
      }
      else{
        notify.error({
          message: "Something went wrong",
          description: "Please check the fields and try again",
          placement: "top",
        });
      }
    } catch (err) {
      console.log("Catch Error 400 " + err);
      if (err.response.status === false) {
        notify.error({
          message: "Already exists",
          description: "This user already exists",
          placement: "top",
        });
      }
      else{
        notify.error({
          message: "Something went wrong",
          description: "Please check the fields or try again later",
          placement: "top",
        });
      }
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
              <Card
                title="Registration"
                variant="borderless"
                style={{ width: "100%" }}
                className="login_page"
              >
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
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    // label="Email"
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  <Form.Item
                    // label="Email"
                    name="email_address"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Please enter your email",
                      },
                    ]}
                  >
                    <Input placeholder="Email address" />
                  </Form.Item>

                  <Form.Item
                    name="phone_number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number",
                      },
                      { validator: validatePhone },
                    ]}
                  >
                    <PhoneInput enableSearch />
                  </Form.Item>
                  <Form.Item
                    // label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item
                    // label="Password"
                    name="confirm_password"
                    dependencies={["password"]} // Triggers re-validation when 'password' changes
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password",
                      },
                      ({ getFieldValue }) => ({
                        validator: validatePasswordMatch(getFieldValue),
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Confirm Password" />
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

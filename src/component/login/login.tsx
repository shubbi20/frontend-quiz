import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginApi } from "../../apiUtil/userApi";

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("quizSessionData")) {
      navigate("/home");
    }
  }, []);

  const onFinish = async (values: any) => {
    console.table(values);
    const [data, error] = await loginApi({
      email: values.email,
      password: values.password,
    });
    if (data) {
      const userData = {
        email: data.email,
        token: data.token,
        name: data.name,
        role: data.role,
      };
      localStorage.setItem("quizSessionData", JSON.stringify(userData));
      message.success("Successfully Logged In");
      navigate("/home");
      window.location.reload();
    } else {
      console.log("error", error);
      message.error(error);
    }
  };

  return (
    <div
      style={{
        margin: "5em auto",
        padding: "0 auto",
        width: "55%",
      }}
    >
      <h1 style={{ fontSize: "24px", fontFamily: "monospace" }}>Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="Email"
          style={{ marginBottom: "30px" }}
          rules={[
            {
              required: true,
            },
            {
              type: "email",
            },
            {
              whitespace: true,
            },
            {
              max: 24,
            },
            {
              min: 7,
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="UserId"
            inputMode="text"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
            },
            {
              max: 24,
            },
            {
              min: 5,
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ marginRight: "4px", marginTop: "15px" }}
          >
            Log in
          </Button>
          Or <a href="/Signup">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "antd/dist/antd.css";
import { signUpApi } from "../utils/apiUtil/userApi";
import { useCookies } from "react-cookie";
import { Wrapper } from "./Login";

const SignUp = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["quizCookie"]);

  const signup = async ({
    name,
    password,
    email,
  }: {
    name: string;
    password: string;
    email: string;
  }) => {
    const [data, error] = await signUpApi({ name, password, email });
    if (data) {
      const userData = {
        email: data.email,
        token: data.token,
        name: data.name,
      };
      setCookie("quizCookie", userData, {
        path: "/",
        maxAge: 86400,
      });
      message.success("Successfully Logged In");
      navigate("/home");
    } else {
      if (error.includes("already registered")) {
        message.info("You have already Registered with us");
        navigate("/login");
        return;
      }
      console.log("Signup error", error);
      message.error(error);
    }
  };

  const onFinish = async (values: any) => {
    console.table(values);
    if (values.password.trim() < 3) {
      message.warn("name:minimum characters should be 3,No whitespace");
      return;
    }
    await signup({
      email: values.email.toLowerCase().trim(),
      name: values.name.toLowerCase().trim(),
      password: values.password,
    });
  };

  return (
    <Wrapper>
      <h1>SignUp</h1>
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
          name="name"
          label="Name"
          style={{ marginBottom: "30px" }}
          rules={[
            {
              required: true,
            },
            {
              type: "string",
            },
            {
              whitespace: true,
            },
            {
              max: 24,
            },
            {
              min: 3,
            },
          ]}
          hasFeedback
        >
          <Input
            type="string"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="UserId"
            inputMode="text"
          />
        </Form.Item>

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
            SignUp
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default SignUp;

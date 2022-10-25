import { Menu } from "antd";
import "antd/dist/antd.min.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const [cookies, setCookie] = useCookies(["quizCookie"]);

  const [items, setItems] = useState([
    {
      key: 1,
      label: "Login",
    },
    {
      key: 2,
      label: "Signup",
    },
  ]);

  useEffect(() => {
    if (cookies.quizCookie) {
      setItems([
        {
          key: 3,
          label: "Home",
        },
        {
          key: 5,
          label: "Draft",
        },
        {
          key: 4,
          label: "Logout",
        },
      ]);
    }
  }, [cookies.quizCookie]);

  const navigate = useNavigate();
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      items={items}
      onClick={({ key, keyPath, domEvent }) => {
        if (key === "2") {
          navigate("signup");
        } else if (key === "1") {
          navigate("login");
        } else if (key === "3") {
          navigate("home");
        } else if (key === "5") {
          navigate("draft");
        } else {
          navigate("logout");
        }
      }}
    />
  );
};
export default MenuBar;

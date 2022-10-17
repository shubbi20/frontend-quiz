import { Menu } from "antd";
import "antd/dist/antd.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSession } from "../apiUtil/apiUrl";

const MenuBar = () => {
  const [userSession, setUserSession] = useState<UserSession>();

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
    if (localStorage.getItem("quizSessionData")) {
      const userData: string | UserSession = JSON.parse(
        localStorage.getItem("quizSessionData") || "s"
      );
      if (typeof userData !== "string") {
        setUserSession(userData);
      }

      if ((userData as UserSession).token) {
        setItems([
          {
            key: 3,
            label: "Home",
          },
          {
            key: 4,
            label: "Logout",
          },
        ]);
      }
    }
  }, [localStorage.getItem("quizSessionData")]);

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
        } else {
          navigate("logout");
        }
      }}
    />
  );
};
export default MenuBar;

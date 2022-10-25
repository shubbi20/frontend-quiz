import { Button, message } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["quizCookie"]);

  const handleOnClick = () => {
    removeCookie("quizCookie");
    message.success("you are successfully logout");
    window.location.reload();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "26px", marginTop: "35px" }}>
        Are you sure you want to logout?
      </div>
      <Button type="primary" size="large" onClick={handleOnClick}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;

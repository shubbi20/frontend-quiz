import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./component/login/login";
import Sign from "./component/signup/signup";
import MenuBar from "./component/menubar";
import { UserSession } from "./apiUtil/apiUrl";
import { useEffect, useState } from "react";
import Home from "./component/home/home";
import Logout from "./component/logout/logout";

function App() {
  const [token, setToken] = useState<UserSession>();

  useEffect(() => {
    if (localStorage.getItem("quizSessionData")) {
      const userData: string = JSON.parse(
        localStorage.getItem("quizSessionData") || "s"
      );
      if (typeof userData !== "string") {
        setToken(userData);
      }
    }
  }, []);

  return (
    <div className="App">
      <MenuBar />
      <Routes>
        {!token && <Route path="/" element={<Login />}></Route>}
        {!token && <Route path="/login" element={<Login />}></Route>}
        {!token && <Route path="/signup" element={<Sign />}></Route>}
        {token && <Route path="/home" element={<Home />}></Route>}
        {token && <Route path="/logout" element={<Logout />}></Route>}
        <Route path="/*" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;

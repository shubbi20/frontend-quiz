import "./App.css";
import { Route, Routes } from "react-router-dom";
import MenuBar from "./component/Menubar";
import { createContext, useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import { UserAuthContext } from "./utils/user-auth-context";
import { Draft } from "./pages/Draft";
import { AddQuiz } from "./pages/AddQuiz";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["quizCookie"]);
  return (
    <UserAuthContext.Provider value={cookies.quizCookie?.token}>
      <div className="App">
        <MenuBar />
        <Routes>
          {!cookies.quizCookie && <Route path="/" element={<Login />}></Route>}
          {!cookies.quizCookie && (
            <Route path="/login" element={<Login />}></Route>
          )}
          {!cookies.quizCookie && (
            <Route path="/signup" element={<SignUp />}></Route>
          )}
          {cookies.quizCookie && (
            <Route path="/home" element={<Home />}></Route>
          )}
          {cookies.quizCookie && (
            <Route path="/logout" element={<Logout />}></Route>
          )}
          {cookies.quizCookie && (
            <Route path="/draft" element={<Draft />}></Route>
          )}
          {cookies.quizCookie && (
            <Route path="/AddQuiz/:permalink" element={<AddQuiz />}></Route>
          )}
          <Route path="/*" element={<Login />}></Route>
        </Routes>
      </div>
    </UserAuthContext.Provider>
  );
}

export default App;

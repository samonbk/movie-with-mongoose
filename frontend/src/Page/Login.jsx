import React, { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoArrowBackSharp, IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";

const Login = () => {
  const { user, logged, account, signOut, setnewuser } = useGlobalContext();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submited, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
  }, [logged]);

  function onSubmit() {
    setSubmitted(true);
    const userAccount = account.find(
      (acc) => acc.username === username && acc.password === password
    );
    if (userAccount) {
      setnewuser(userAccount);
      localStorage.setItem("movieforkhusernamekey", userAccount.username);
    } else {
      console.log("Invalid username or password");
    }
  }

  useEffect(() => {
    if (logged) {
      onBlack();
    }
  }, [logged]);

  function onBlack() {
    navigate("/");
  }

  function onEyesToggle() {
    setShow(!show);
  }

  return (
    <>
      <div className="w-full h-screen bg-black fixed top-0 left-0 z-50 flex justify-center items-center">
        <form
          action=""
          className="max-w-[500px] bg-zinc-800 rounded-xl px-6 py-10"
        >
          <h1 className="text-center text-3xl font-semibold">Lon in</h1>
          <span
            className={`mt-2 inline-block ${
              submited && !logged ? "text-red-600" : "text-green-600"
            }`}
          >
            {submited && !logged ? "Invalid username or password" : ""}
          </span>
          <div className="max-w-[500px] md:min-w-[400px] mt-2 border-zinc-700 py-2 px-4 rounded-xl border">
            <input
              className="w-full focus:bg-transparent bg-transparent focus:outline-none text-lg inputbg"
              type="text"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-8 max-w-[500px] w-full border border-zinc-700 py-2 px-4 rounded-xl flex">
            <input
              className="w-full bg-transparent focus:bg-transparent focus:outline-none text-lg "
              type={show ? "text" : "password"}
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={onEyesToggle}>
              {show ? <FaEyeSlash /> : <IoEyeSharp />}
            </button>
          </div>
          <button
            className="w-full h-10 flex justify-center items-center mt-8 bg-zinc-600 rounded-xl"
            type="button"
            onClick={onSubmit}
          >
            Log in
          </button>
          <Link to={"/signup"} className="font-bold mt-6 block">
            Create
          </Link>
        </form>
        <button onClick={onBlack} className="absolute top-5 left-5  text-3xl">
          <IoArrowBackSharp />
        </button>
      </div>
    </>
  );
};

export default Login;

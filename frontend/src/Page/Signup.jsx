import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import axios from "axios";
import { IoArrowBackSharp, IoEyeSharp } from "react-icons/io5";

const Signup = () => {
  const { user, logged, signOut, account, setnewuser } = useGlobalContext();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submited, setSubmitted] = useState(false);

  // useEffect(() => {
  //   setSubmitted(false);
  // }, [logged]);

  function onSubmit() {
    setSubmitted(true);
    const maxId = Math.max(...account.map((acc) => parseInt(acc.id)));
    const newid = maxId + 1;
    const newUser = {
      id: newid.toString(),
      username,
      password,
      role: "",
    };

    console.log(newUser);

    const usercheck = account.find((acc) => acc.username === username);
    if (!usercheck) {
      axios
        .post("http://localhost:3000/account", newUser)
        .then((response) => {
          console.log("You successfully created a new account");
          console.log(response.data); // The newly created account object returned from the server
          account.push(response.data); // Optionally, update your local 'account' array with the new account
          setnewuser(newUser);
          localStorage.setItem("movieforkhusernamekey", newUser.username);
          onBlack();
        })
        .catch((error) => {
          console.error("There was an error creating the account!", error);
        });
    } else {
      console.log("Username is already used");
      console.log(account);
    }
  }

  function onBlack() {
    navigate(-1);
    setPassword("");
    setUsername("");
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
          <h1 className="text-center text-3xl font-semibold">Sign Up</h1>
          <span
            className={`mt-2 inline-block ${
              submited && !logged ? "text-red-500" : "text-green-600"
            }`}
          >
            {submited && !logged ? "Username is already used!" : ""}
          </span>
          <div className="max-w-[500px] md:min-w-[400px] mt-1 border-zinc-700 py-2 px-4 rounded-xl border">
            <input
              className="w-full bg-transparent focus:bg-transparent focus:outline-none text-lg"
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
            Sign Up
          </button>
        </form>
        <button onClick={onBlack} className="absolute top-5 left-5 text-3xl">
          <IoArrowBackSharp />
        </button>
      </div>
    </>
  );
};

export default Signup;

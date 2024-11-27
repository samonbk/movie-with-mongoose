import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext, useUserContext } from "../../Context";
import axios from "axios";
import { IoArrowBackSharp, IoEyeSharp } from "react-icons/io5";
import { set } from "mongoose";
import { FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const { logged, accounts, setnewuser } = useGlobalContext();
  const { users, fetchUsers, createUser, success, message } = useUserContext();
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [submited, setSubmitted] = useState(false);

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // console.log(users);

  const onSubmit = async () => {
    setSubmitted(true);

    // Wait for createUser to complete and get its result
    const result = await createUser(newUser);

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  function onBlack() {
    navigate(-1);
    setNewUser({ username: "", password: "" });
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
              !success ? "text-red-500" : "text-green-600"
            }`}
          >
            {submited ? message : ""}
          </span>
          <div className="max-w-[500px] md:min-w-[400px] mt-1 border-zinc-700 py-2 px-4 rounded-xl border">
            <input
              className="w-full bg-transparent focus:bg-transparent focus:outline-none text-lg"
              type="text"
              name="username"
              placeholder="username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
          </div>
          <div className="mt-8 max-w-[500px] w-full border border-zinc-700 py-2 px-4 rounded-xl flex">
            <input
              className="w-full bg-transparent focus:bg-transparent focus:outline-none text-lg "
              type={show ? "text" : "password"}
              name="password"
              placeholder="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
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

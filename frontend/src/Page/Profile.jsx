import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";

const Profile = () => {
  const navigate = useNavigate();
  const { acount, user } = useGlobalContext();

  function handleBack() {
    navigate(-1);
  }

  return (
    <>
      <div className="max-w-[1575px] m-auto">
        <section
          className="cover w-full h-[400px] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${user.cover})`,
          }}
        >
          <div className="absolute left-5 top-5 text-3xl">
            <Link onClick={handleBack}>
              <BiArrowBack />
            </Link>
          </div>
          <div className="md:w-[890px] w-full absolute top-[200px] left-1/2 -translate-x-1/2 bg-zinc-700 rounded-2xl text-white pb-12">
            <div className="flex items-center justify-center w-full flex-col">
              <div className="w-[200px] h-[200px] bg-blue-400 rounded-full  overflow-hidden -mt-[100px] shadow-lg">
                <img src={user.picture} alt="" />
              </div>
              <h1 className="mt-5 text-3xl">@{user.username}</h1>
              <div className="flex gap-4 mt-4">
                <span className="">role:</span>
                <span className="">{user.role}</span>
              </div>
              <div className="flex gap-4 mt-4">
                <span className="">bio:</span>
                <span className="">{user.bio}</span>
              </div>
              <div className="flex gap-4 mt-4">
                <span className="">DOB:</span>
                <span className="">{user.dob}</span>
              </div>
              <div className="flex gap-4 mt-4">
                <span className="">phone:</span>
                <span className="">{user.phone}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;

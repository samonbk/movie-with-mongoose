import React, { useEffect, useState } from "react";
import { BiArrowBack, BiEdit, BiSave } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext, useUserContext } from "../../Context";
import { RiImageEditLine } from "react-icons/ri";
const Profile = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const { updateUser, success, message } = useUserContext();
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  console.log(updatedUser);

  const onEdit = () => {
    setEditing(true);
    setUpdatedUser({ ...user });
  };

  function handleBack() {
    navigate(-1);
  }

  const onSave = async () => {
    const result = await updateUser(updatedUser);
    if (result.success) {
      setEditing(false);
      alert(result.message);
      setImage(null);
    }
  };

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Preview the selected image
      setImage(file);
      setUpdatedUser({ ...updatedUser, img: image });
    }
  };

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
            {!editing ? (
              <div className="flex items-center justify-center w-full flex-col">
                <div className="w-[200px] h-[200px] bg-blue-400 rounded-full flex overflow-hidden -mt-[100px] shadow-lg">
                  {user.img == "" ? (
                    <div className="text-white text-3xl w-full h-full flex items-center justify-center">
                      <input
                        type="file"
                        id="file-upload"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />

                      {/* Label styled as a button with the icon */}
                      <label
                        htmlFor="file-upload"
                        style={{ cursor: "pointer", fontSize: "24px" }}
                      >
                        <RiImageEditLine />
                      </label>
                      <img src={preview} alt="" />
                    </div>
                  ) : (
                    <img src={user.img} alt="" />
                  )}
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
            ) : (
              <div className="w-full flex-col">
                <div className="max-w-[500px] mx-auto">
                  <div className="w-[200px] h-[200px] bg-blue-400 rounded-full  overflow-hidden -mt-[100px] shadow-lg mx-auto">
                    <img src={user.picture} alt="" />
                  </div>
                  <div className="grid grid-cols-12 mt-6">
                    <div className="col-span-4">
                      <label htmlFor="username">Username:</label>
                    </div>
                    <div className="col-span-8">
                      <input
                        className="border bg-transparent rounded-xl py-1 px-2 min-w-full"
                        type="text"
                        placeholder="username"
                        name="username"
                        value={updatedUser.username}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            username: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 mt-6">
                    <div className="col-span-4">
                      <label htmlFor="role">role:</label>
                    </div>
                    <div className="col-span-8">
                      <input
                        className="border bg-transparent rounded-xl py-1 px-2 min-w-full"
                        type="text"
                        placeholder="role"
                        name="role"
                        value={updatedUser.role}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            role: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 mt-6">
                    <div className="col-span-4">
                      <label htmlFor="phone">phone:</label>
                    </div>
                    <div className="col-span-8">
                      <input
                        className="border bg-transparent rounded-xl py-1 px-2 min-w-full"
                        type="text"
                        placeholder="phone"
                        name="phone"
                        value={updatedUser.phone}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 mt-6">
                    <div className="col-span-4">
                      <label htmlFor="dob">dob:</label>
                    </div>
                    <div className="col-span-8">
                      <input
                        className="border bg-transparent rounded-xl py-1 px-2 min-w-full"
                        type="date"
                        placeholder="dob"
                        name="dob"
                        value={updatedUser.dob}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            dob: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 mt-6">
                    <div className="col-span-4">
                      <label htmlFor="bio">bio:</label>
                    </div>
                    <div className="col-span-8">
                      <input
                        className="border bg-transparent rounded-xl py-1 px-2 min-w-full"
                        type="text"
                        placeholder="bio"
                        name="bio"
                        value={updatedUser.bio}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            bio: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="absolute top-3 right-3">
              {editing || image ? (
                <button
                  className="text-red-400 items-center flex gap-1"
                  onClick={onSave}
                >
                  Save{" "}
                  <div>
                    <BiSave />
                  </div>
                </button>
              ) : (
                <button
                  className="text-red-400 items-center flex gap-1"
                  onClick={onEdit}
                >
                  Edit
                  <div className="text-2xl flex items-center">
                    <BiEdit />
                  </div>
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;

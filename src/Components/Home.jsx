import React, { useEffect } from "react";
import { createUserInstance } from "../Axios/Axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Logout } from "../../Redux/Slice";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

function Home() {
  const [user, setUser] = useState("");
  const navigate = useNavigate("");
  const userInstance = createUserInstance();
  const userId = useSelector((store) => store.user.id);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      userInstance.get(`/homePage?id=${userId}`).then((res) => {
        if (res.data) {
          console.log(res.data.user);
          setUser(res.data.user);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [show]);

//   ========LOGOUT FUNCTION =======

  const logOut = () => {
    try {
      dispatch(Logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" bg-slate-300 w-screen h-screen  items-center">
        <div className="w-full flex items-center justify-end h-14 bg-black">
          <button
            className="text-white mr-4 border px-3 py-1 rounded"
            onClick={logOut}
          >
            Logout
          </button>
        </div>
        <div className="relative w-screen h-[90vh] bg-[#2f2f2f] flex justify-center items-center">
          <div className="w-full sm:w-3/5 lg:w-2/5 h-5/6 bg-slate-600 flex justify-center items-center">
            <div className="bg-slate-400 flex justify-center items-center  w-11/12 h-[93%]">
              <div className="w-9/12 h-[60%]  flex flex-col items-center gap-y-3 justify-center">
                <div className="flex flex-col justify-center gap-y-2 items-center">
                  <div className="w-24 rounded-full">
                    <img
                      className="rounded-full"
                      src={
                        user && user.image
                          ? user.image
                          : "https://www.thejungleadventure.com/assets/images/logo/noimage.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="w-20"></div>
                </div>
                <div className="w-9/12 rounded">
                  <input
                    className="w-full py-2 outline-none  h-full px-1 rounded"
                    type="text"
                    name=""
                    id=""
                    value={user ? user.name : ""}
                  />
                </div>
                <div className="w-9/12 rounded">
                  <div className="w-full h-full bg-white py-2 px-1">
                    {user ? user.email : ""}
                  </div>
                </div>
                <div className="w-9/12 rounded">
                  <input
                    className={`${
                      user && user.phone ? "text-black" : "text-slate-400"
                    } w-full outline-none py-2 h-full px-1 rounded`}
                    type="text"
                    name=""
                    value={
                      user
                        ? user.phone
                          ? user.phone
                          : "update phone number"
                        : "Update phone number"
                    }
                    id=""
                  />
                </div>
                <div className="w-9/12 rounded">
                  <input
                    className={`${
                      user && user.location ? "text-black" : "text-slate-400"
                    } w-full outline-none py-2 h-full px-1 rounded`}
                    name=""
                    value={
                      user
                        ? user.location
                          ? user.location
                          : "update the Location"
                        : "Update the Location"
                    }
                    id=""
                  />
                </div>
                <div className="w-9/12 rounded">
                  <button
                    onClick={() => setShow(true)}
                    className="w-full py-1.5 font-semibold text-white h-full rounded bg-black"
                  >
                    Update your profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {show && <Modal user={user} setShow={setShow} />}
      </div>
    </>
  );
}

export default Home;

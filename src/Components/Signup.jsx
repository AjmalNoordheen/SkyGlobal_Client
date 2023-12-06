import React, { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserInstance } from "../Axios/Axios";
import toast from "react-hot-toast";
import CachedIcon from '@mui/icons-material/Cached';

function Signup() {
  const userNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [spin,setSpin] = useState(false)

  const userInstance = createUserInstance();

  const [valid, setValid] = useState(null);
  const [passValid, setPassvalid] = useState(null);
  const [eye, setEye] = useState(false);
  const navigate = useNavigate("");

  //======= USERNAME VALIDATION =========
  const validUserName = (value) => {
    const charRegex = /^[a-zA-Z]+$/;
    try {
      if (charRegex.test(value)) {
        setValid(true);
      } else {
        if (value == "") {
          setValid(null);
        } else {
          setValid(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //======= EMAIL VALIDATION =========
  const validateForm = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    try {
      if (emailRegex.test(value)) {
        setValid(true);
      } else {
        if (value == "") {
          setValid(null);
          return;
        } else {
          setValid(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //======= PASSWORD VALIDATION =========
  const validPassword = (value) => {
    try {
      let passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*]{6,100}$/;
      if (passRegex.test(value)) {
        setPassvalid(true);
      } else {
        console.log(value);
        if (value == "") {
          setPassvalid(null);
        } else {
          setPassvalid(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //=======  USER REGISTRATION FUNCTION  =========
  const submitSignup = async () => {
    setSpin(true)
    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*]{6,100}$/;
      const charRegex = /^[a-zA-Z]+$/;

      if (
        !charRegex.test(userNameRef.current.value) ||
        userNameRef.current.value == "" ||
        !emailRegex.test(emailRef.current.value) ||
        emailRef.current.value === "" ||
        !passRegex.test(passwordRef.current.value) ||
        passwordRef.current.value === ""
      ) {
        toast.error("Incomplete Form filling");
        return;
      }

      await userInstance
        .post("/submitSignup", {
          userName: userNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        .then((res) => {
          if(res.data.status) {
            toast.success(res.data.message)
            navigate('/')
          }else{
            toast.error(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }finally{
      setSpin(false)
    }
  };
  return (
    <div className="w-screen h-screen flex bg-[#1a1a1a] justify-center items-center">
      <div className="w-screen h-4/5   sm:w-[85%] md:w-6/12 sm:h-3/5 lg:h-4/5  lg:w-[30%]  bg-black flex flex-col items-center rounded">
          <h1 className="font-bold text-slate-200 mt-5 font-insta text-3xl">
            Sky-Goal
          </h1>
        <div className="w-full h-2/3 pt- flex flex-col gap-y-[1.1rem] justify-center items-center">
          <small className="font-secondFont font-semibold text-base text-gray-500">
            Create your Account
          </small>
          <div className="w-3/4 h-[2.8rem] border border-green-600 bg-black">
            <input
              title="only Accepts characters"
              onChange={(e) => validUserName(e.target.value)}
              ref={userNameRef}
              type="text"
              placeholder="User Name"
              className="w-full outline-none  h-full bg-[#404447] text-[#dddde0] text-start pl-2"
            />
          </div>
          <div
            className={
              valid == true
                ? "w-3/4 h-[2.8rem] border border-green-600 bg-black"
                : valid == false
                ? "w-3/4 h-[2.8rem] border border-red-700 bg-black "
                : "w-3/4 h-[2.8rem] bg-black "
            }
          >
            <input
              onChange={(e) => validateForm(e.target.value)}
              ref={emailRef}
              type="email"
              className={
                valid == true
                  ? "w-full outline-none h-full bg-[#404447] text-[#dddde0] border border-green-600 text-start pl-2"
                  : valid == false
                  ? "w-full border outline-none border-red-700 h-full bg-[#404447] text-[#dddde0] text-start pl-2"
                  : "w-full outline-none  h-full bg-[#404447] text-[#dddde0] text-start pl-2"
              }
              placeholder="Email"
            />
          </div>
          <div
            className={
              passValid == true
                ? "w-3/4 h-[2.8rem] border border-green-600 bg-black relative"
                : passValid === false
                ? "w-3/4 h-[2.8rem] border border-red-600 bg-black relative"
                : "w-3/4 h-[2.8rem] bg-black relative"
            }
          >
            <input
              onChange={(e) => validPassword(e.target.value)}
              ref={passwordRef}
              type={eye ? "text" : "password"}
              className={
                passValid
                  ? "w-full h-full bg-[#404447] outline-none border border-green-600 text-[#dddde0] text-start pl-2"
                  : passValid == false
                  ? "w-full h-full bg-[#404447] outline-none border border-red-600 text-[#dddde0] text-start pl-2"
                  : "w-full h-full bg-[#404447] outline-none text-[#dddde0] text-start pl-2"
              }
              placeholder="Password"
            />
            {eye ? (
              <IconButton
                onClick={() => setEye(false)}
                className=" absolute bottom-[2.5rem] left-[87%]"
              >
                <VisibilityOffIcon
                  fontSize="small"
                  className="text-slate-400"
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => setEye(true)}
                className=" absolute bottom-[2.5rem] left-[87%]"
              >
                <VisibilityIcon fontSize="small" className="text-slate-400" />
              </IconButton>
            )}
          </div>
          {passValid == false ? (
            <small className="text-red-400 text-xs  overflow-x-clip">
              must constain 6 length number 1-9 ,capital A-Z ,small a-z letters
            </small>
          ) : (
            ""
          )}
          <div
            onClick={submitSignup}
            className={`w-3/4 h-[2.8rem] flex cursor-pointer hover:scale-105 hover:duration-300 bg-gradient-to-r from-red-500 via-orange-700 to-rose-700 justify-center items-center bg-[#7370f8]`}
          >
            <p className="text-center font-bold   w-full  text-white">
              {spin ? <CachedIcon className="animate-spin"/> : "Sign up" }
            </p>
          </div>
          <div className="w-3/4  flex justify-between items-center">
            <span className="w-[45%] h-[0.5px] bg-white"></span>
            <small className="font-insta mb-[2px] text-white">or</small>
            <span className="w-[45%] h-[0.5px] bg-white"></span>
          </div>
        </div>
        <div className="w-3/4 h-fit cursor-pointer py-1  overflow-hidden flex border justify-center gap-2 mt-1">
          <small
            onClick={() => navigate("/")}
            className=" cursor-pointer mt-1  pb-1 ml-2 text-slate-500"
          >
            Already have an account ?
            <span className="ml-2 text-blue-600 font-bold">Login</span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Signup;

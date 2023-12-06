import React, { useState } from "react";
import { createUserInstance } from "../Axios/Axios";
import toast from "react-hot-toast";
import CachedIcon from "@mui/icons-material/Cached";

function Modal({ setShow, user }) {
    const [image, setImage] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLoaction] = useState("");
    const [prev, setPrev] = useState("");
    const userInstance = createUserInstance();
    const [spin, setSpin] = useState(false);

    //======= IMAGE CHANGING FUNC =========

    const uploadImage = (img) => {
        setPrev(img);
        const selectedImage = img;

        if (selectedImage) {
            let reader = new FileReader();
            reader.readAsDataURL(selectedImage);
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.onerror = (error) => {
                console.log("Error: ", error);
            };
        }
    };

    //======= USER DETAILS UPDATE FUNC =========

    const updateUser = async () => {
        setSpin(true);
        try {
            if (image == "" || phone == "" || location == "") {
                return toast.error("fill all the feilds");
            }
            if (phone.length !== 10) {
                return toast.error("Phone must have 10 numbers");
            }
            if (location.length < 3) {
                return toast.error("location atleast conatin 3");
            }
            const id = user._id;
            const result = await userInstance.patch("/updateDetails", {
                image,
                phone,
                location,
                id,
            });
            if (result.data.status) {
                toast.success("updated successfully");
                setShow(false);
            } else {
                toast.error("unable to update");
                setShow(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=" bg-slate-400 fixed top-[6.4rem] right-20 flex flex-col border items-center justify-evenly h-80 lg:w-[23%] rounded">
            <div
                onClick={() => setShow(false)}
                className="absolute top-0 right-1 p-2 font-bold text-red-700 cursor-pointer "
            >
                X
            </div>
            <div className="w-5/12 h-20 flex-col items-end  rounded">
                <img
                    className="w-full h-full border border-slate-300  rounded"
                    src={
                        prev instanceof File
                            ? URL.createObjectURL(prev)
                                ? URL.createObjectURL(prev)
                                : user.image
                                    ? user.image
                                    : "https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png"
                            : "https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png"
                    }
                    alt=""
                />
                <input
                    onChange={(e) => uploadImage(e.target.files[0])}
                    accept="image/*"
                    className="outline-none  mt-2 text-xs cursor-pointer ml-2"
                    type="file"
                />
            </div>
            <div className="w-8/12 bg-red-600 h-10 mt-4 rounded">
                <input
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                    placeholder="phone"
                    className="w-full h-full outline-none rounded pl-2"
                    type="number"
                    name=""
                    id=""
                />
            </div>
            <div className="w-8/12 bg-red-600 h-10 rounded">
                <input
                    onChange={(e) => {
                        setLoaction(e.target.value);
                    }}
                    placeholder="location"
                    className="w-full h-full outline-none rounded pl-2"
                    type="text"
                    name=""
                    id=""
                />
            </div>
            <button
                onClick={updateUser}
                className="w-8/12 bg-black text-white font-semibold h-10 rounded"
            >
                {" "}
                {spin ? <CachedIcon className="animate-spin" /> : "Submit"}
            </button>
        </div>
    );
}

export default Modal;

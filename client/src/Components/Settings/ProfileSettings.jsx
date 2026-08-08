import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import { UserContext } from "../../context/UserContext.js";
import { IoMdCheckmark } from "react-icons/io";
import toast from 'react-hot-toast'

function ProfileSettings() {
  const { user } = React.useContext(UserContext);
  let [name, setName] = React.useState(user?.fullname || "");
  let [about, setAbout] = React.useState(
    user?.about || "Hey there! I am using Whatsapp Clone.",
  );

  let handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user?.email);
      toast.success("copied to clipboard")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex-1 relative h-full flex items-start flex-col gap-3 p-5">
      <h1 className="text-2xl font-regular">Profile Settings</h1>
      <p className="text-md text-gray-300">Manage your profile information</p>
      <div className="divider"></div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm font-medium">About</p>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Enter your about information"
              className="input input-ghost w-full focus:outline-0 focus:border-b-emerald-400"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <div className="flex items-center justify-center w-[50px] h-[50px] hover:bg-base-200 group rounded-md">
              <IoMdCheckmark className="text-gray-500 group-hover:text-white" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm font-medium">Name</p>
          <div className="flex gap-2 items-center">

          <input
            type="text"
            placeholder="Enter your name"
            className="input input-ghost w-full focus:outline-0 focus:border-b-emerald-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          <div className="flex items-center justify-center w-[50px] h-[50px] hover:bg-base-200 group rounded-md">
            <IoMdCheckmark className="text-gray-500 group-hover:text-white" />
          </div>
            </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <p className="text-sm font-medium">Email</p>
          <div className="flex gap-5">
            <HiOutlineMail className="text-xl text-gray-500" />
            <span className="text-sm text-gray-500 flex-1">
              {user?.email || "example@example.com"}
            </span>
            <MdOutlineContentCopy className="text-xl text-gray-500 cursor-pointer hover:text-emerald-400" onClick={handleCopy} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;

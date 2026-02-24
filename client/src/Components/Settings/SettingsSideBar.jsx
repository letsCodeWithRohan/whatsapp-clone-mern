import { IoSearch } from "react-icons/io5";
import { useContext, useState } from "react";
import SettingsTabs from "./SettingsTabs";
import { IoLaptopOutline, IoKeyOutline } from "react-icons/io5";
import {
  MdOutlineLock,
  MdOutlineChat,
  MdOutlineNotifications,
} from "react-icons/md";
import { FiVideo } from "react-icons/fi";
import { LuCircleHelp } from "react-icons/lu";
import { FaRegKeyboard } from "react-icons/fa6";
import { UserContext } from "../../context/UserContext";

function SettingsSideBar() {
  const [search, setSearch] = useState("");
  const {user} = useContext(UserContext);
  return (
    <div className="md:w-[25%] w-max h-full items-center md:p-3 p-2 justify-between gap-3 border-base-300 border-r-2 flex flex-col">
      <div className="flex items-center w-full justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>
      <div className="rounded-md md:flex hidden items-center gap-2 bg-base-200 w-full py-2 px-3">
        <IoSearch className="opacity-50 text-md" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search settings"
          className="placeholder:text-sm text-sm outline-none flex-1 border-0"
        />
      </div>
      {/* Avatar */}
      <div className="md:p-2 p-2 hover:bg-base-200 rounded-md flex gap-3 items-center bg-base-100 w-full">
        <div className="avatar">
          <div className="w-20 rounded-full">
            <img src={user?.profilePicture} />
          </div>
        </div>
        <div className="md:flex hidden flex-col gap-0.5">
          <span className="text-md font-semibold">{user?.fullname}</span>
          <span className="text-sm font-regular text-gray-400">{user?.bio}</span>
        </div>
      </div>
      {/* Line */}
      <div className="w-full h-[1px] bg-gray-600"></div>

      <div className="flex flex-col gap-1 flex-1 w-full overflow-y-auto">
        <SettingsTabs
          icon={<IoLaptopOutline className="text-2xl mx-2" />}
          main="General"
          description="startup and close"
        />
        <SettingsTabs
          icon={<IoKeyOutline className="text-2xl mx-2" />}
          main="Account"
          description="account privacy"
        />
        <SettingsTabs
          icon={<MdOutlineLock className="text-2xl mx-2" />}
          main="Privacy"
          description="account privacy"
        />
        <SettingsTabs
          icon={<MdOutlineChat className="text-2xl mx-2" />}
          main="Chats"
          description="account privacy"
        />
        <SettingsTabs
          icon={<FiVideo className="text-2xl mx-2" />}
          main="Video"
          description="account privacy"
        />
        <SettingsTabs
          icon={<MdOutlineNotifications className="text-2xl mx-2" />}
          main="Notifications"
          description="account privacy"
        />
        <SettingsTabs
          icon={<FaRegKeyboard className="text-2xl mx-2" />}
          main="Keyboard Layout"
          description="account privacy"
        />
        <SettingsTabs
          icon={<LuCircleHelp className="text-2xl mx-2" />}
          main="Help"
          description="account privacy"
        />
      </div>
    </div>
  );
}

export default SettingsSideBar;

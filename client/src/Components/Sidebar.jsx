import { FiMenu } from "react-icons/fi";
import { PiChatCircleText } from "react-icons/pi";
import { IoIosStarOutline } from "react-icons/io";
import { BsArchive } from "react-icons/bs";
import { GoGear } from "react-icons/go";
import { IoCallOutline,IoLogOutOutline } from "react-icons/io5";
import { TbHistoryToggle } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import socket from '../socket.js'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {UserContext} from '../context/UserContext.js'
import {useContext, useState} from 'react'

function Sidebar() {

  const navigate = useNavigate()

  const {user,setUser} = useContext(UserContext)
  // const [profilePic,setProfilePic] = useState('https://img.daisyui.com/images/profile/demo/yellingcat@192.webp')

  const handleLogout = () => {
    axios.post("http://localhost:3000/api/auth/logout",{},{
      withCredentials: true
    })
    .then((res) => {
      socket.disconnect()
      setUser(null)
      navigate('/login')
      toast.success(res.data.message)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="p-2 md:flex hidden flex-col items-center justify-between h-full py-3">
          <div className="flex flex-col items-center gap-2">
            <div className="h-[2em] w-[2em] rounded-sm hover:bg-base-100 flex items-center justify-center">
              <FiMenu className="text-lg cursor-pointer"/>
            </div>
            <div className="flex flex-col items-center gap-2">
              <NavLink to="/" className="h-[2em] w-[2em] rounded-sm hover:bg-base-100 flex items-center justify-center">
                <PiChatCircleText className="text-lg cursor-pointer"/>
              </NavLink>
              <NavLink to="/call" className="h-[2em] w-[2em] rounded-sm hover:bg-base-100 flex items-center justify-center">
                <IoCallOutline className="text-lg cursor-pointer"/>
              </NavLink>
              <NavLink to="/status" className="h-[2em] w-[2em] rounded-sm hover:bg-base-100 flex items-center justify-center">
                <TbHistoryToggle className="text-lg cursor-pointer"/>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-[2em] w-[2em] rounded-sm hover:bg-base-100 flex items-center justify-center">
              <IoIosStarOutline className="text-lg cursor-pointer"/>
            </div>
            <div className="h-[2em] w-[2em] rounded-sm hover:bg-base-100 flex items-center justify-center">
              <BsArchive className="text-lg cursor-pointer"/>
            </div>
            <div className="w-full h-[1px] bg-white/30"></div>
            <div className="h-[2em] w-[2em] rounded-sm hover:bg-base-100 flex items-center justify-center">
              <GoGear className="text-lg cursor-pointer"/>
            </div>
            <div className="avatar">
              <div className="w-7 rounded-full">
                <img
  src={user?.profilePicture || 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp'}
  alt="User profile"
  className="text-lg cursor-pointer"
/>

              </div>
            </div>
            <div className="h-[2em] w-[2em] rounded-sm hover:bg-base-100 flex items-center justify-center">
              <IoLogOutOutline title="Logout" onClick={handleLogout} className="text-lg cursor-pointer"/>
            </div>
          </div>
        </div>
  )
}

export default Sidebar

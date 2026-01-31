import { FaWhatsapp } from "react-icons/fa";
import Sidebar from '../Components/Sidebar';
import DefaultChatScreen from '../Components/Chat/DefaultChatScreen.jsx';
import ChatSideBar from '../Components/Chat/ChatSideBar';
import ChatScreen from '../Components/Chat/ChatScreen';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import socket from '../socket.js'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from '../context/UserContext.js'

function Home() {
  const { user, setUser, onlineUsers, setOnlineUsers } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/check-auth", {
      withCredentials: true
    })
      .then(({ data }) => {
        setUser(data.user)
      })
      .catch((err) => {
        toast.error("Please Login First")
        navigate("/login")
      })
  }, [setUser, navigate])

  useEffect(() => {
    if (user && user._id && socket.connected) {
      socket.emit("user-connected", user._id)
    }

    return () => {
      socket.off("user-connected")
    }
  }, [user])


  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected")
      if (user && user._id) {
        socket.emit("user-connected", user._id)
      }
    }

    const handleDisconnect = () => {
      console.log("Socket disconnected")
    }

    const handleUpdateUserStatus = (userIds) => {
      setOnlineUsers(Array.isArray(userIds) ? userIds : [])
    }

    socket.on("connect", handleConnect)
    socket.on("disconnect", handleDisconnect)
    socket.on("update-user-status", handleUpdateUserStatus)

    return () => {
      socket.off("connect", handleConnect)
      socket.off("disconnect", handleDisconnect)
      socket.off("update-user-status", handleUpdateUserStatus)
    }
  }, [user])

  const [selectedUser, setSelectedUser] = useState(false)

  return (
    <div className='bg-base-300 flex flex-col overflow-hidden h-[100dvh] w-full'>
      <div className='flex items-center p-3 gap-2'>
        <FaWhatsapp className="text-green-500 text-xl" />
        <h1 className='text-sm font-semibold'>Whatsapp Clone</h1>
      </div>
      <div className="flex-1 flex h-0 min-h-0">
        <Sidebar />
        <div className="bg-base-100 flex-1 h-full min-h-0 flex rounded-tl-md overflow-hidden">
          <ChatSideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          {selectedUser ?
            <ChatScreen selectedUser={selectedUser} /> :
            <DefaultChatScreen />}
        </div>
      </div>
    </div>
  )
}

export default Home
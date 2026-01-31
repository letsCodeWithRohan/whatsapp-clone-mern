import { IoSearch } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";
import { ImAttachment } from "react-icons/im";
import { BsSend } from "react-icons/bs";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { MdMicNone } from "react-icons/md";
import { useEffect, useState,useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Timestamp from "./Timestamp";
import axios from 'axios'
import socket from '../../socket.js'

function ChatScreen({ selectedUser }) {

    const {user,onlineUsers} = useContext(UserContext)

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/api/message/get/${selectedUser._id}`, {
            withCredentials: true
        })
        .then(({data}) => {
            setMessages(data.messages)
            console.log(messages)
        })
        .catch((err) => {
            console.error(err.message)
        })
    }, [selectedUser])

    const handleSendMessage = async () => {
        try {
            const { data } = await axios.post(
                `http://localhost:3000/api/message/send/${selectedUser._id}`,
                { message: input },
                { withCredentials: true }
            );
            setMessages([...messages, data.sentMessage]);
            socket.emit("message-sent",{
                senderId: user._id,
                message: data.sentMessage,
                receiverId: selectedUser._id
            })
            setInput('')
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        socket.on("receive-message",(message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        })

        return () => {
            socket.off("receive-message")
        }
    },[selectedUser._id])

    return (
        <div className="flex-1 h-full justify-between flex flex-col gap-3">
            <div className="flex w-full items-center py-2 px-3 border-b-2 border-base-300 justify-between">
                <div className="flex items-center gap-3">
                    <div className={`avatar ${(Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser._id)) ? 'avatar-online' : 'avatar-offline'}`}>
                        <div className="md:w-12 w-10 rounded-full">
                            <img src={selectedUser.profilePicture} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-semibold">{selectedUser.fullname}</h3>
                        <p className="text-xs text-gray-500">
                            {(Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser._id)) ? 'online' : selectedUser.lastSeen && !isNaN(new Date(selectedUser.lastSeen)) 
                                ? 'Last seen, Today at  ' + new Date(selectedUser.lastSeen).toLocaleString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }) 
                                : '10:30 PM'}
                        </p>
                    </div>
                </div>
                <div className="h-[2.5em] w-[2.5em] rounded-sm hover:bg-base-300 flex items-center justify-center">
                    <IoSearch className="text-lg cursor-pointer" />
                </div>
            </div>
            <div className="flex-1 w-full overflow-y-auto flex flex-col gap-2 py-1 px-3" id="chat-scroll">
                <Timestamp/>
                {
                    messages.length > 0 && messages.map((msg) => {
                        return (msg.receiverId === selectedUser._id) 
                        ? <SenderMessage key={msg._id} time={msg.createdAt} message={msg.message} seen={msg.seen} /> 
                        : <ReceiverMessage key={msg._id} time={msg.createdAt} message={msg.message}/>
                    })
                }
            </div>
            <div className="flex w-full items-center py-1 ps-1 pe-3 gap-1 border-t-2 border-base-300">
                <div className="h-[2.5em] w-[2.5em] rounded-sm hover:bg-base-300 flex items-center justify-center">
                    <CiFaceSmile className="text-lg cursor-pointer" />
                </div>
                <div className="h-[2.5em] w-[2.5em] rounded-sm hover:bg-base-300 flex items-center justify-center">
                    <ImAttachment className="text-lg font-light cursor-pointer" />
                </div>
                <div className="flex-1 flex items-center gap-2 ps-2">
                    <input
                        type="text"
                        className="w-full placeholder:text-sm outline-0"
                        placeholder="Type a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                {input.trim() === '' ?
                    <div className="h-[2.5em] w-[2.5em] rounded-sm hover:bg-base-300 flex items-center justify-center">
                        <MdMicNone className="text-lg cursor-pointer" />
                    </div> :
                    <div onClick={handleSendMessage} className="h-[2.5em] w-[2.5em] rounded-sm hover:bg-base-300 flex items-center justify-center">
                        <BsSend className="text-lg cursor-pointer" />
                    </div>}
            </div>
        </div>
    )
}

export default ChatScreen

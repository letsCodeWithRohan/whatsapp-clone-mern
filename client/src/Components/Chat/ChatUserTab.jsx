import {useContext} from 'react'
import { formatDate } from '../../utils/dateFormatter.js'
import { UserContext } from '../../context/UserContext.js'

function ChatUserTab({_id,fullname,profilePicture,selectedUser,onClick,lastMessage,lastMessageTime,unreadCount,lastMessageSenderId,lastMessageReceiverId}) {

    const {user,onlineUsers} = useContext(UserContext)

    return (
        <div
        onClick={onClick}
         className={`hover:bg-base-200 md:p-2 p-1 rounded-md flex items-center gap-3 cursor-pointer ${selectedUser._id === _id ? 'bg-base-200' : ''}`}>
            <div className={`avatar ${(Array.isArray(onlineUsers) && onlineUsers.includes(_id)) ? 'avatar-online' : 'avatar-offline'}`}>
                <div className="md:w-12 w-10 rounded-full">
                    <img src={profilePicture} />
                </div>
            </div>
            <div className="flex-1 md:flex hidden flex-col gap-1 justify-center overflow-hidden">
                <h3 className="text-sm font-semibold text-ellipsis text-nowrap">{fullname}</h3>
                <p className="text-xs text-gray-500 text-ellipsis text-nowrap">{lastMessage === null ? "Start a new Chat" : (lastMessageSenderId == user._id) ? `You : ${lastMessage}` : lastMessage}</p>
            </div>
            <div className="md:flex hidden flex-col items-end gap-1">
                <span className={`text-[11px] font-semibold ${unreadCount > 0 ? 'text-emerald-600' : 'text-gray-500'}`}>{formatDate(lastMessageTime)}</span>
                {unreadCount > 0 && <span className="w-[15px] rounded-full h-[15px] grid place-items-center text-base-300 bg-emerald-600">
                    <span className="text-[10px] font-semibold">{unreadCount}</span>
                </span>}
            </div>
        </div>
    )
}

export default ChatUserTab

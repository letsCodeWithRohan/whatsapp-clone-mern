import { RiMenu5Line } from "react-icons/ri";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import ChatUserTab from "./ChatUserTab";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import socket from "../../socket.js";

function ChatSideBar({ selectedUser, setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/users", {
        withCredentials: true,
      }); // Adjust the endpoint as needed
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      updateSidebar(message, "received");
    };

    const handleSentMessage = (message) => {
      updateSidebar(message, "sent");
    };

    const updateSidebar = (message, type) => {
      setUsers((prevUsers) => {
        const chatUserId =
          type === "sent" ? message.receiverId : message.senderId;

        const chatUser = prevUsers.find(
          (u) => String(u._id) === String(chatUserId),
        );

        if (!chatUser) {
          return prevUsers;
        }

        const isCurrentChat = String(selectedUser?._id) === String(chatUserId);

        const updatedUser = {
          ...chatUser,

          lastMessage: message.message,

          lastMessageTime: message.createdAt,

          lastMessageSenderId: message.senderId,

          lastMessageReceiverId: message.receiverId,

          unreadCount:
            type === "sent"
              ? 0
              : isCurrentChat
                ? chatUser.unreadCount
                : chatUser.unreadCount + 1,
        };

        const remainingUsers = prevUsers.filter(
          (u) => String(u._id) !== String(chatUserId),
        );

        return [updatedUser, ...remainingUsers];
      });
    };

    socket.on("receive-message", handleReceiveMessage);

    socket.on("message-sent-confirmed", handleSentMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);

      socket.off("message-sent-confirmed", handleSentMessage);
    };
  }, [selectedUser]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (search !== "") {
      const filteredUsers = users.filter(
        (user) =>
          user.fullname.toLowerCase().includes(search.toLowerCase()) ||
          user.username.toLowerCase().includes(search.toLowerCase()),
      );
      setUsers(filteredUsers);
    }
  }, [search, users]);

  const handleUserClick = (user) => {
    setSelectedUser(user);

    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u._id === user._id
          ? {
              ...u,
              unreadCount: 0,
            }
          : u,
      ),
    );
  };

  return (
    <div className="md:w-[25%] w-max h-full items-center md:p-3 p-2 justify-between gap-3 border-base-300 border-r-2 flex flex-col">
      <div className="flex items-center w-full justify-between">
        <h2 className="text-lg font-semibold">Chats</h2>
        <div className="md:flex hidden items-center gap-2">
          <div className="h-[2em] w-[2em] rounded-sm hover:bg-base-200 flex items-center justify-center">
            <FaRegPenToSquare className="text-md cursor-pointer" />
          </div>
          <div className="h-[2em] w-[2em] rounded-sm hover:bg-base-200 flex items-center justify-center">
            <RiMenu5Line className="text-lg cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="rounded-md border-b-2 border-emerald-600 md:flex hidden items-center gap-2 bg-base-200 w-full py-2 px-3">
        <IoSearch className="opacity-50 text-md" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search or start a new chat"
          className="placeholder:text-sm text-sm outline-none flex-1 border-0"
        />
      </div>
      <div className="flex flex-col gap-2 flex-1 w-full overflow-y-auto">
        {/* Chat list items would go here */}
        {loading
          ? [1, 2, 3, 4, 5, 6, 7].map((elm) => (
              <div key={elm} className="skeleton w-full h-[70px]"></div>
            ))
          : users.map((user) => (
              <ChatUserTab
                selectedUser={selectedUser}
                key={user._id}
                _id={user._id}
                {...user}
                onClick={() => handleUserClick(user)}
              />
            ))}
        {/* If No Chats then */}
        {/* <p className="text-sm text-gray-500">No chats available</p> */}
      </div>
    </div>
  );
}

export default ChatSideBar;

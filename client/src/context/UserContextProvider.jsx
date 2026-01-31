import { useState } from 'react'

import { UserContext } from './UserContext'

function UserContextProvider({ children }) {

  const [user, setUser] = useState({
    firstName: 'Gordon',
    lastName: 'Freeman',
  });

  const [onlineUsers,setOnlineUsers] = useState([])

  return (
    <UserContext.Provider value={{ user, setUser,onlineUsers,setOnlineUsers }}>
      {children}
    </UserContext.Provider>
  )

}

export default UserContextProvider;
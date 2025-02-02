import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState()
  const [chats, setChats] = useState([])
  const navigate = useNavigate(); 


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("User Info:", userInfo);  
    setUser(userInfo);
    if (!userInfo) navigate("/"); 
  }, [navigate]); 

  useEffect(() => {
    if (user) {
      console.log("Updated User Name:", user.user.name); 
    }
  }, [user]);


  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

import React, { useState, useEffect } from "react";
import { useChatContext } from "../context/ChatProvider";
import { useToast, Box, Text, Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./Chatloading";
import { getSender, getSenderFull } from "../utils/chatUtils";
import GroupChatModel from "../utils/GroupChatModel";

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const toast = useToast();
  const { user, selectedChat, setSelectedChat, chats, setChats } =
    useChatContext();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      // console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch chats",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
   fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModel>
        <Button
          display="flex"
          p={5}
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
        </GroupChatModel>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
      >
        {chats ? (
          <Stack>
            {chats.map((chat) => (
                 <Box
                 onClick={() => setSelectedChat(chat)}
                 cursor="pointer"
                 p={3}
                 bg={selectedChat === chat ? "pink" : "white"}
                 borderRadius="lg"
                 borderBottom="1px solid #E0E0E0"
                 key={chat._id}
               >
                 <Text>
                   {!chat.isGroupChat 
                     ? chat.users[1]?.name || "Unknown" 
                     : chat.chatName}
                 </Text>
               </Box>
               
          
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;

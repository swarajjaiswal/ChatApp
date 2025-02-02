import React, { useEffect, useState } from "react";
import { useChatContext } from "../context/ChatProvider";
import {
  Box,
  IconButton,
  Text,
  Input,
  FormControl,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../utils/chatUtils";
import ShowProfile from "./ShowProfile";
import UpdateGroupChat from "../utils/UpdateGroupChat";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, setSelectedChat, selectedChat } = useChatContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          `/api/message`,
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        console.log(data);
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage(""); // Clear the input field
      } catch (error) {
        toast({
          title: "Error sending message",
          description: error.response?.data?.message || "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to load messages",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <Box
      padding={{ base: 2, md: 4 }}
      w="100%"
      h="100%"
      bg="white"
      boxShadow="md"
      borderRadius="md"
      display="flex"
      flexDirection="column"
    >
      {selectedChat ? (
        <>
          {/* Header */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={{ base: 2, md: 4 }}
            borderBottom="1px solid #E2E8F0"
          >
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(null)}
              display={{ base: "flex", md: "none" }}
              aria-label="Back to chat list"
            />
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
              {!selectedChat.isGroupChat
                ? selectedChat.users[1]?.name || "Unknown"
                : selectedChat.chatName}
            </Text>

            {!selectedChat.isGroupChat ? (
              <ShowProfile user={getSenderFull(user, selectedChat.users)} />
            ) : (
              <UpdateGroupChat
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                fetchMessages={fetchMessages}
              />
            )}
          </Box>

          <Box flex="1" bg="#F9FAFB" p={4} overflowY="auto" borderRadius="lg">
            {loading ? (
              <Spinner
                size="xl"
                thickness="4px"
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages flex flex-col overflow-y-scroll ">
                <ScrollableChat messages={messages} />
              </div>
            )}
          </Box>

          {/* Input Box */}
          <FormControl mt={3} onKeyDown={sendMessage} isRequired>
            <Input
              placeholder="Type your message here"
              value={newMessage}
              onChange={typingHandler}
              variant="filled"
              bg="white"
              border="1px solid #CBD5E0"
              _focus={{ borderColor: "blue.400" }}
            />
          </FormControl>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="100%"
        >
          <Text fontSize={{ base: "lg", md: "2xl" }} textAlign="center">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SingleChat;

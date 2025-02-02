import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { SearchIcon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState, useRef } from "react";
import { useChatContext } from "../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import ShowProfile from "./ShowProfile";
import axios from "axios";
import ChatLoading from "./Chatloading";
import UserList from "./UserList";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    useChatContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const btnRef = useRef();
  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      // Artificial delay to simulate a real API response
      setTimeout(() => {
        setSearchResult(data);
        setLoading(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
console.log(data);  // Debugging line
      if (!chats.find((chat) => chat._id === data._id)) {
        setChats([data, ...chats]); 
      }
      setSelectedChat(data);  
      setLoadingChat(false);
      onClose();  
    } catch (error) {
      setLoadingChat(false);
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        borderWidth="5px"
        p="5px 10px"
      >
        <Tooltip
          hasArrow
          label="Search For Users"
          bg="gray.300"
          color="black"
          placement="bottom-end"
        >
          <Button variant="ghost" onClick={onOpen}>
            <SearchIcon />
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontFamily="Work-sans" fontSize="2xl">
          ChatApp
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" margin="1px" />
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.user.name}
                src={user.user.pic}
              />
            </MenuButton>

            <MenuList>
              <ShowProfile user={user}>
                <MenuItem>My Profile</MenuItem>
              </ShowProfile>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody display="flex" flexDirection="column" gap={4}>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Type here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline" ml={3} onClick={handleSearch}>
                Go
              </Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
              <Box>
                {searchResult.length > 0 ? (
                  searchResult.map((user) => (
                    <UserList
                      key={user._id}
                      user={user}
                      handleFunction={() => {
                        console.log("Selected User ID:", user._id);  // Debugging line
                        accessChat(user._id);  // Access the chat with the correct user ID
                      }}
                    />
                  ))
                ) : (
                  <Text>No results found</Text>
                )}
              </Box>
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chats"); // use navigate instead of history.push
    }
  }, [navigate]);

  return (
    <div className="home">
      <Container maxW={"xl"} centerContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={3}
          bg="white"
          borderRadius="md"
          shadow="md"
          color="black"
          w="100%"
          margin="40px 0 15px 0"
        >
          <Text fontFamily="Work-sans" fontSize="3xl">
            WEB App
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={3}
          w="100%"
          bg="white"
          borderRadius="md"
          shadow="md"
        >
          <Tabs variant="solid-rounded" colorScheme="purple" w="100%">
            <TabList mb="12px">
              <Tab w="50%">Login</Tab>
              <Tab w="50%">SignUp</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;

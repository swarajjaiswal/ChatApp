import React, { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setShow(!show);
  };

  const toast = useToast();
  const navigate = useNavigate();  

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill in all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
   
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      }, config);
      
      toast({
        title: "User Logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chats'); 
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <VStack
        spacing="5px"
        align="center"
        justify="center"
        w="100%"
        maxW="400px"
        m="0 auto"
        p="5"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        boxShadow="lg"
      >
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          variant="outline"
          colorScheme="blue"
          w="100%"
          m={4}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          colorScheme="blue"
          w="100%"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("Guest@123");
          }}
        >
          Get Guest Credentials
        </Button>
      </VStack>
    </>
  );
};

export default Login;

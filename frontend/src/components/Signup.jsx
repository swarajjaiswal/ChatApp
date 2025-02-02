import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  FormControl,
  FormLabel,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const toast = useToast();
  const navigate = useNavigate();
  
  const postPic = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please upload a picture",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    console.log(`Image Name: ${pic.name}`);
    console.log(`Image Size: ${(pic.size / 1024).toFixed(2)} KB`);

    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "dznztgpbd");

    fetch("https://api.cloudinary.com/v1_1/dznztgpbd/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const imageUrl = data.url.toString();
        setPic(imageUrl);
        console.log(`Uploaded Image URL: ${imageUrl}`);
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Image upload failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill in all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
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
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );

      toast({
        title: "User registered successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
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
    <VStack spacing="5px" align="stretch">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => postPic(e.target.files[0])}
        />
      </FormControl>

      <ButtonGroup variant="outline" mt={4}>
        <Button
          colorScheme="blue"
          marginX="auto"
          w="90%"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Signup
        </Button>
      </ButtonGroup>
    </VStack>
  );
};

export default Signup;

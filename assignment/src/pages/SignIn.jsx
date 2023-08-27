import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const SignIn = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();
  const HandleChange = (evt) => {
    let { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const SignInUser = (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      toast({
        title: "Please Fill All fields",
        description: "",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      localStorage.setItem("user", formData.name);

      toast({
        title: "Welcome to Home-Page.",
        description: "Please Click on shop Now To continue .",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigateTo("/");
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        minH={"100vh"}
        bg={useColorModeValue("gray.50", "gray.800")}
        mt={"100px"}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign In
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              🙏welcomes you🙏
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            bgColor="#f0f1f7 "
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      borderColor={"grey"}
                      name="name"
                      type="text"
                      placeholder="Enter Name Here"
                      value={formData.firstName}
                      onChange={HandleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={HandleChange}
                  borderColor={"grey"}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password Here"
                    value={formData.password}
                    onChange={HandleChange}
                    borderColor={"grey"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={SignInUser}
                >
                  Sign In
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignIn;

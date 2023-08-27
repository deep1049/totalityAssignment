"use client";

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar(props) {
  const navigateTo = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [bag, setBag] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const SetCart = () => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      setBag(cart);
    }
  };
  useEffect(() => {
    SetCart();
    setLoggedIn(localStorage.getItem("user"));
  }, [props]);
  const Logout = () => {
    localStorage.removeItem("user");
    navigateTo("/signin");
  };

  return (
    <>
      <Box
        position={"fixed"}
        top={0}
        left={0}
        right={0}
        zIndex={1000} // Adjust the z-index as needed
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link to="/">
            <Tooltip label="click to visit HomePage" aria-label="A tooltip">
              <Box>
                <strong>E-Commerce</strong>
              </Box>
            </Tooltip>
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>{" "}
              <Link to="/cart">
                <Tooltip
                  label="Click Here to navigate cart Page"
                  aria-label="A tooltip"
                >
                  <Button>
                    {/* <BsHandbag /> */}
                    <Box>
                      {" "}
                      Cart
                      <Text ml={2} display={"inline-block"}>
                        {bag.length}
                      </Text>
                    </Box>
                  </Button>
                </Tooltip>
              </Link>
              {loggedIn ? (
                <>
                  <Flex alignItems={"center"}>
                    <Tooltip label="User Name" aria-label="A tooltip">
                      <span>{localStorage.getItem("user")}</span>
                    </Tooltip>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <Tooltip
                      label="Click Here To LogOut"
                      aria-label="A tooltip"
                    >
                      <FaSignOutAlt onClick={Logout} />
                    </Tooltip>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        minW={0}
                      >
                        <Avatar
                          size={"sm"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </MenuButton>
                      <MenuList alignItems={"center"}>
                        <br />
                        <Center>
                          <Avatar
                            size={"2xl"}
                            src={
                              "https://avatars.dicebear.com/api/male/username.svg"
                            }
                          />
                        </Center>
                        <br />
                        <Center>
                          <p>Username</p>
                        </Center>
                        <br />
                        <MenuDivider />
                        <MenuItem>Your Servers</MenuItem>
                        <MenuItem>Account Settings</MenuItem>
                        <MenuItem onClick={Logout}>Logout</MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </>
              ) : (
                <Box>
                  <Button colorScheme="teal">
                    <Link to="/signin">
                      <Tooltip
                        label="Click Here To SignIn"
                        aria-label="A tooltip"
                      >
                        Sign In
                      </Tooltip>
                    </Link>
                  </Button>
                </Box>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

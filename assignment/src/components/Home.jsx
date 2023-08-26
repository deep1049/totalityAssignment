import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Stack,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <Box p={8}>
        {/* <Flex justify="space-between" align="center">
        <Image src="/logo.png" alt="E-Commerce Logo" h={10} />
        <Button colorScheme="teal">Sign In</Button>
      </Flex> */}
        <Box mt={12}>
          <Stack spacing={8}>
            <Box>
              <Heading fontSize="4xl">Welcome to Our E-Commerce Store</Heading>
              <Text mt={4}>
                Discover amazing products and shop from a wide range of
                categories.
              </Text>
            </Box>
            <Link to="/products">
              <Button colorScheme="teal" size="lg">
                Shop Now
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

const Cart = () => {
  const navigateTo = useNavigate();
  const goto = (path) => {
    navigateTo(path);
  };
  const [bag, setBag] = useState([]);
  // const navigateTo = useNavigate();
  const [coupon, setCoupon] = useState({
    applied: false,
    percent: 10,
  });
  const toast = useToast();
  const increaseQuantity = (product) => {
    const updatedBag = bag.map((item) => {
      if (item.name === product.name) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setBag(updatedBag);
    localStorage.setItem("cart", JSON.stringify(updatedBag));
  };

  const decreaseQuantity = (product) => {
    const updatedBag = bag.map((item) => {
      if (item.name === product.name && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setBag(updatedBag);
    localStorage.setItem("cart", JSON.stringify(updatedBag));
  };
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigateTo("/signin");
      toast({
        title: "Please SignIn First.",

        status: "success",
        duration: 6000,
        isClosable: true,
      });
      return;
    }
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      setBag(cart);
    }
  }, []);
  const RemoveProduct = (product) => {
    let newArr = [];
    let flag = 0;
    newArr = bag.filter((item) => {
      if (item.name === product.name) {
        if (flag === 0) {
          flag = 1;
          return false;
        } else {
          return true;
        }
      } else {
        return item.name !== product.name;
      }
    });
    localStorage.setItem("cart", JSON.stringify(newArr));
    setBag(newArr);
  };
  const Calculate = (type) => {
    let result = 0;
    if (type === "producttotal") {
      bag.forEach((item) => {
        result += item.price * item.quantity;
      });
    }
    if (type === "checkouttotal") {
      bag.forEach((item) => {
        result += item.price * item.quantity;
      });
      result += 100;
    }
    return result;
  };
  const PlacedOrder = () => {
    localStorage.removeItem("cart");
    toast({
      title: "Processing...",
      status: "info",
      duration: 2500,
      isClosable: true,
    });
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully",
        status: "success",
        duration: 3500,
        isClosable: true,
      });
      navigateTo("/");
    }, 2500);
  };
  return (
    <div>
      <Navbar />

      <div className="bag">
        <div className="bag-contents">
          {bag.length === 0 ? (
            <Box>
              <Heading> Cart is Empty</Heading>
              <Image
                src="https://i.pinimg.com/originals/66/22/ab/6622ab37c6db6ac166dfec760a2f2939.gif"
                alt="err"
                margin={"auto"}
              />
            </Box>
          ) : null}
          <Box
            display={{ lg: "flex", sm: "grid" }}
            marginTop="50px"
            justifyContent="space-around"
          >
            <Box>
              {bag.map((item) => {
                return (
                  //   <Flex></Flex>
                  <Card
                    direction={{ base: "column", sm: "row" }}
                    variant="outline"
                    marginBottom="20px"
                    marginLeft={"20px"}
                  >
                    <CardBody>
                      <Image
                        src={item.img}
                        alt={item.name}
                        objectFit="cover"
                        maxW={{ base: "100%", sm: "200px" }}
                      />
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{item.name}</Heading>

                        <Text color="blue.600" fontSize="2xl">
                          ${item.price}
                        </Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardBody>
                      {/* ... existing code ... */}
                      <Text>Quantity: {item.quantity}</Text>
                      <ButtonGroup mt={2} size="sm">
                        <Button onClick={() => decreaseQuantity(item)}>
                          -
                        </Button>
                        <Button onClick={() => increaseQuantity(item)}>
                          +
                        </Button>
                      </ButtonGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                        variant="solid"
                        backgroundColor={"#D3145A"}
                        color="white"
                        onClick={() => RemoveProduct(item)}
                      >
                        Remove
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </Box>
            {bag.length !== 0 ? (
              <Box width={{ lg: "35%" }}>
                <Card overflow="hidden" variant="outline" padding={"10px"}>
                  <Box>
                    <Heading>Total</Heading>
                    <Box
                      marginBottom={"20px"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Heading size={"sm"} fontWeight={"medium"}>
                        Total Price
                      </Heading>
                      <Heading fontWeight={"medium"} size={"sm"}>
                        {coupon.applied ? (
                          <Text fontSize="xl" className="colored-text">
                            ${Calculate("producttotal_coupon_applied")}
                          </Text>
                        ) : null}
                        <Text
                          fontSize={`${coupon.applied ? "l" : "xl"}`}
                          className={`${coupon.applied ? "strike-text" : ""}`}
                        >
                          ${Calculate("producttotal")}
                        </Text>
                      </Heading>
                    </Box>
                    <Box
                      marginBottom={"20px"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Heading fontWeight={"medium"} size={"sm"}>
                        Shipping Charges
                      </Heading>
                      <Heading
                        size={"sm"}
                        fontWeight={"medium"}
                        color="green.400"
                      >
                        FREE
                      </Heading>
                    </Box>
                    <Box
                      marginBottom={"20px"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Heading size={"sm"} fontWeight={"medium"}>
                        Applicable Tax And Charges ⓘ
                      </Heading>
                      <Heading size={"sm"} fontWeight={"medium"}>
                        $ 65
                      </Heading>
                    </Box>
                    <Box
                      marginBottom={"20px"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Heading
                        size={"sm"}
                        fontWeight={"medium"}
                        color={"#D3145A"}
                      >
                        Amount Payable
                      </Heading>
                      <Heading size={"sm"} fontWeight={"medium"}>
                        {coupon.applied ? (
                          <Text fontSize="xl" className="colored-text">
                            $ {Calculate("checkouttotal_coupon_applied")}
                          </Text>
                        ) : null}
                        <Text
                          fontSize={`${coupon.applied ? "l" : "xl"}`}
                          className={`${coupon.applied ? "strike-text" : ""}`}
                        >
                          ${Calculate("checkouttotal")}
                        </Text>
                      </Heading>
                    </Box>
                    <Button
                      backgroundColor={"#D3145A"}
                      color="white"
                      onClick={PlacedOrder}
                    >
                      Placed Order
                    </Button>
                  </Box>
                </Card>
              </Box>
            ) : null}
          </Box>
          {/* </Flex> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;

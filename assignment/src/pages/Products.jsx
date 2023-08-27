import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Select,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Data } from "../utility/Data";
const Products = () => {
  const [sortOption, setSortOption] = useState("price"); // Default sorting by price
  const [filterOption, setFilterOption] = useState("all"); //
  const [sortOrder, setSortOrder] = useState("asc");
  const [data, setData] = useState([...Data]);
  const [cartlength, setCartLength] = useState(0);
  const toast = useToast();
  const imageStyles = {
    width: "100%",
    paddingBottom: "80%", // Maintain a square aspect ratio (1:1)
    position: "relative",
  };

  const imgStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "80%",
    objectFit: "cover",
  };
  const sortedAndFilteredData = data
    .filter((product) => {
      if (filterOption === "all") {
        return true;
      } else {
        return product.idtype === filterOption;
      }
    })
    .sort((a, b) => {
      if (sortOption === "price") {
        const priceComparison = a.price - b.price;
        return sortOrder === "asc" ? priceComparison : -priceComparison;
      } else if (sortOption === "rating") {
        return parseFloat(b.rating) - parseFloat(a.rating);
      } else {
        return 0;
      }
    });
  const AddToCart = (product) => {
    console.log("dev", product);

    let cart = localStorage.getItem("cart");

    if (cart) {
      cart = JSON.parse(cart);
      //
      const found = cart.find((v) => v.prodID === product.prodID);
      if (found) {
        toast({
          title: "Item already present in Cart!",
          status: "success",
          duration: 3500,
          isClosable: true,
        });
        return;
      }
      //
      cart.push({ ...product, quantity: 1 });
      toast({
        title: "Product Added to the Cart Successfully",
        status: "success",
        duration: 3500,
        isClosable: true,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      setCartLength(cart.length);
    } else {
      let arr = [];
      arr.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(arr));
      setCartLength(arr.length);
    }
  };
  return (
    <div>
      <Navbar cartLength={cartlength} />
      <h1>Products</h1>
      <Box justifyContent={"space-between"}>
        <Flex>
          <Box mt={4}>
            <Text mb={2}>Sort by:</Text>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </Select>
          </Box>

          <Box mt={4}>
            <Text mb={2}>Category :</Text>
            <Select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">All</option>
              <option value="T-shirt">T-shirt</option>
              <option value="footwear">Footwear</option>
              <option value="shirt">Shirt</option>
            </Select>
          </Box>
        </Flex>
        <Flex>
          <Box mt={4}>
            <Text mb={2}>Sort order Price:</Text>
            <ButtonGroup variant="outline">
              <Button
                onClick={() => setSortOrder("asc")}
                isActive={sortOrder === "asc"}
              >
                Ascending
              </Button>
              <Button
                onClick={() => setSortOrder("desc")}
                isActive={sortOrder === "desc"}
              >
                Descending
              </Button>
            </ButtonGroup>
          </Box>
        </Flex>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={8}>
        {sortedAndFilteredData.map((product) => (
          <Box
            key={product.prodID}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
          >
            <div style={imageStyles}>
              <Image src={product.img} alt={product.name} style={imgStyles} />
            </div>

            <Box p={4}>
              <Heading as="h3" size="md" mb={2}>
                {product.name}
              </Heading>
              <Heading as="h3" size="md" mb={2}>
                Rating:{product.rating}
              </Heading>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                ${product.price.toFixed(2)}
              </Text>
              <Flex justify="center">
                <Button onClick={() => AddToCart(product)} colorScheme="teal">
                  Add to Cart
                </Button>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Products;

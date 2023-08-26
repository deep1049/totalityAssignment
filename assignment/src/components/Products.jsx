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
} from "@chakra-ui/react";
import React, { useState } from "react";

const Products = () => {
  const [sortOption, setSortOption] = useState("price"); // Default sorting by price
  const [filterOption, setFilterOption] = useState("all"); //
  const [sortOrder, setSortOrder] = useState("asc");
  const MEN_DATA = [
    {
      img: "/images/menproducts/m2.jpg",
      name: "Solid Elasticated Joggers",
      price: 699,
      rating: " 4.7(428)",
      idtype: "eye",
      prodID: "1",
    },
    {
      img: "/images/menproducts/m3.jpg",
      name: " Solid Slim Fit Polo T-shirt",
      price: 299,
      rating: " 4.7(53)",
      idtype: "combo",
      prodID: "2",
    },
    {
      img: "/images/menproducts/m4.jpg",
      name: " Solid Crew Neck Lounge T-shirt",
      price: 399,
      idtype: "eye",
      rating: " 4.6",
    },
    {
      img: "/images/menproducts/m5.jpg",
      name: "Striped Elasticated Waist Shorts",

      price: 99,
      idtype: "combo",
      rating: "4.9",
    },
    {
      img: "/images/menproducts/m6.jpg",
      name: "Solid Mandarin Collar Slim Fit Casual Shirt",
      price: 399,
      idtype: "foundation",
      rating: " 4.9",
    },
    {
      img: "/images/menproducts/m7.jpg",
      name: "Solid Elasticated Waist Lounge Shorts - Pack Of 2",
      price: 199,
      idtype: "foundation",
      rating: "4.8",
    },
    {
      img: "/images/menproducts/m8.jpg",
      name: "Solid Mandarin Collar Slim Fit Casual Shirt",
      price: 599,
      idtype: "eye",
      rating: "4.8",
    },
    {
      img: "/images/menproducts/m9.jpg",
      name: "MAX men Textured Sports Shoes",
      price: 99,
      idtype: "foundation",
      rating: " 4.8",
    },
    {
      img: "/images/menproducts/m10.jpg",
      name: " Floral Printed High Neck A-line",
      price: 399,
      rating: "4.7",
      idtype: "combo",
    },
    {
      img: "/images/menproducts/m11.jpg",
      name: "Printed A-Line Dress",
      price: 599,
      rating: "4.7",
      idtype: "combo",
    },
    {
      img: "/images/menproducts/m12.jpg",
      name: "MAX men Textured Sports Shoes",
      price: 879,
      rating: "4.7",
      idtype: "combo",
    },
    {
      img: "/images/menproducts/m1.jpg",
      name: "MAX Men Solid Crew Neck T-shirt - Set of 2",
      price: 129,
      rating: "4.7",
      idtype: "combo",
    },
    {
      img: "/images/menproducts/m13 (1).jpg",
      name: "Striped Laced-Up Shoes",
      price: 99,
      rating: "4.7",
      idtype: "combo",
    },
    {
      img: "/images/menproducts/m13 (2).jpg",
      name: "Flat",
      price: 599,
      rating: "4.7",
      idtype: "combo",
    },
    {
      img: "/images/menproducts/m13 (3).jpg",
      name: "Flipflops",
      price: 899,
      rating: "4.7",
      idtype: "combo",
    },
    {
      img: "/images/menproducts/m13 (4).jpg",
      name: "shoes",
      price: 199,
      rating: "4.7",
      idtype: "combo",
    },
  ];
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
  const sortedAndFilteredData = MEN_DATA.filter((product) => {
    if (filterOption === "all") {
      return true;
    } else {
      return product.idtype === filterOption;
    }
  }).sort((a, b) => {
    if (sortOption === "price") {
      const priceComparison = a.price - b.price;
      return sortOrder === "asc" ? priceComparison : -priceComparison;
    } else if (sortOption === "rating") {
      return parseFloat(b.rating) - parseFloat(a.rating);
    } else {
      return 0;
    }
  });
  return (
    <div>
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
            <Text mb={2}>Filter by:</Text>
            <Select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">All</option>
              <option value="eye">Eye</option>
              <option value="combo">Combo</option>
              <option value="foundation">Foundation</option>
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
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                ${product.price.toFixed(2)}
              </Text>
              <Flex justify="center">
                <Button colorScheme="teal">Add to Cart</Button>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Products;

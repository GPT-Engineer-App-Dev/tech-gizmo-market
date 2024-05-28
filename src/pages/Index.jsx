import { Box, Container, Flex, Heading, Image, Text, VStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Smartphone",
    description: "A modern smartphone with all the latest features.",
    price: "$699",
    image: "/images/smartphone.jpg",
  },
  {
    id: 2,
    name: "Laptop",
    description: "A sleek, powerful laptop for all your computing needs.",
    price: "$999",
    image: "/images/laptop.jpg",
  },
  {
    id: 3,
    name: "Camera",
    description: "A high-end digital camera for capturing stunning photos.",
    price: "$499",
    image: "/images/camera.jpg",
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxW="container.xl" p={4}>
      <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Heading as="h1" size="lg">
          <Link to="/">ElectroShop</Link>
        </Heading>
        <Box>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/products">Products</Link>
        </Box>
      </Flex>

      <Box mt={4} mb={8}>
        <Input
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
          size="lg"
        />
      </Box>

      <VStack spacing={8} mt={8}>
        {filteredProducts.map((product) => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%" maxW="lg">
            <Image src={product.image} alt={product.name} />

            <Box p={6}>
              <Box d="flex" alignItems="baseline">
                <Heading as="h2" size="md" fontWeight="semibold" lineHeight="tight" isTruncated>
                  {product.name}
                </Heading>
              </Box>

              <Text mt={2}>{product.description}</Text>

              <Box mt={2} fontWeight="semibold" as="h4" lineHeight="tight">
                {product.price}
              </Box>
            </Box>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
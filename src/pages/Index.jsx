import { Box, Container, Flex, Heading, Image, Text, VStack, Input, Select, Checkbox, CheckboxGroup, Stack, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Smartphone",
    description: "A modern smartphone with all the latest features.",
    price: "$699",
    image: "/images/smartphone.jpg",
    category: "smartphone",
    priceRange: "500-999",
    brand: "brandA",
  },
  {
    id: 2,
    name: "Laptop",
    description: "A sleek, powerful laptop for all your computing needs.",
    price: "$999",
    image: "/images/laptop.jpg",
    category: "laptop",
    priceRange: "500-999",
    brand: "brandB",
  },
  {
    id: 3,
    name: "Camera",
    description: "A high-end digital camera for capturing stunning photos.",
    price: "$499",
    image: "/images/camera.jpg",
    category: "camera",
    priceRange: "0-499",
    brand: "brandC",
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleBrandChange = (event) => {
    const value = event.target.value;
    setSelectedBrands((prev) =>
      prev.includes(value) ? prev.filter((brand) => brand !== value) : [...prev, value]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRange("");
    setSelectedBrands([]);
    setSearchTerm("");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPriceRange = selectedPriceRange ? product.priceRange === selectedPriceRange : true;
    const matchesBrand = selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true;

    return matchesSearchTerm && matchesCategory && matchesPriceRange && matchesBrand;
  });

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
          mb={4}
        />
        <Flex wrap="wrap" gap={4}>
          <Select placeholder="Select category" value={selectedCategory} onChange={handleCategoryChange} width="200px">
            <option value="smartphone">Smartphone</option>
            <option value="laptop">Laptop</option>
            <option value="camera">Camera</option>
          </Select>
          <Select placeholder="Select price range" value={selectedPriceRange} onChange={handlePriceRangeChange} width="200px">
            <option value="0-499">$0 - $499</option>
            <option value="500-999">$500 - $999</option>
            <option value="1000-1499">$1000 - $1499</option>
          </Select>
          <CheckboxGroup value={selectedBrands} onChange={handleBrandChange}>
            <Stack direction="row">
              <Checkbox value="brandA">Brand A</Checkbox>
              <Checkbox value="brandB">Brand B</Checkbox>
              <Checkbox value="brandC">Brand C</Checkbox>
            </Stack>
          </CheckboxGroup>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </Flex>
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
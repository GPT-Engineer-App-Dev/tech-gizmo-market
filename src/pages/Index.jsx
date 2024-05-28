import { Box, Container, Flex, Heading, Image, Text, VStack, Input, Checkbox, CheckboxGroup, Stack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Select } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Smartphone",
    description: "A modern smartphone with all the latest features.",
    price: 699,
    category: "Electronics",
    brand: "BrandA"
    image: "/images/smartphone.jpg",
  },
  {
    id: 2,
    name: "Laptop",
    description: "A sleek, powerful laptop for all your computing needs.",
    price: 999,
    category: "Electronics",
    brand: "BrandB"
    image: "/images/laptop.jpg",
  },
  {
    id: 3,
    name: "Camera",
    description: "A high-end digital camera for capturing stunning photos.",
    price: 499,
    category: "Electronics",
    brand: "BrandC"
    image: "/images/camera.jpg",
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    setSelectedBrands((prev) =>
      checked ? [...prev, value] : prev.filter((brand) => brand !== value)
    );
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearchTerm && matchesCategory && matchesBrand && matchesPrice;
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
        />
      </Box>

      <Flex direction={{ base: "column", md: "row" }} mb={8}>
        <Box flex="1" mr={{ md: 4 }} mb={{ base: 4, md: 0 }}>
          <Heading as="h3" size="md" mb={4}>Filter by Category</Heading>
          <CheckboxGroup value={selectedCategories} onChange={handleCategoryChange}>
            <Stack spacing={2}>
              <Checkbox value="Electronics">Electronics</Checkbox>
              <Checkbox value="Clothing">Clothing</Checkbox>
              <Checkbox value="Home">Home</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>

        <Box flex="1" mr={{ md: 4 }} mb={{ base: 4, md: 0 }}>
          <Heading as="h3" size="md" mb={4}>Filter by Brand</Heading>
          <Stack spacing={2}>
            <Checkbox value="BrandA" onChange={handleBrandChange}>BrandA</Checkbox>
            <Checkbox value="BrandB" onChange={handleBrandChange}>BrandB</Checkbox>
            <Checkbox value="BrandC" onChange={handleBrandChange}>BrandC</Checkbox>
          </Stack>
        </Box>

        <Box flex="1">
          <Heading as="h3" size="md" mb={4}>Filter by Price</Heading>
          <Slider
            aria-label="price-range"
            defaultValue={[0, 1000]}
            min={0}
            max={1000}
            step={50}
            onChangeEnd={handlePriceChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} index={0} />
            <SliderThumb boxSize={6} index={1} />
          </Slider>
          <Text mt={2}>Price Range: ${priceRange[0]} - ${priceRange[1]}</Text>
        </Box>
      </Flex>

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
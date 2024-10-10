import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiCartAdd, BiMinus, BiPlus, BiBulb, BiMoon } from "react-icons/bi";

import YourCart from "./YourCart";
import Loader from "./Loader";

const Home = ({ colorMode, toggleColorMode }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [isCartCleared, setIsCartCleared] = useState(false);

  const handleAdd = (itemId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1,
    }));
  };

  const handleRemove = (itemId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: Math.max((prevCart[itemId] || 0) - 1, 0),
    }));
  };

  const handleAddToCart = (itemId) => {
    handleAdd(itemId);
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[itemId];
      return newCart;
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch("data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Box
        h={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Text>Error: {error}</Text>
      </Box>
    );
  }

  return (
    <>
      <Box
        p={"20px"}
        background={colorMode === "light" ? "hsl(13, 31%, 94%)" : "#1A1D23"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading fontSize={{ base: "22px", md: "30px" }}>Desserts</Heading>
          <Button
            h={{ base: "14px", md: "22px" }}
            p={{ base: "10px", md: "15px 20px" }}
            borderRadius={"20px"}
            background={
              colorMode === "light" ? "hsl(159, 69%, 38%)" : "hsl(14, 86%, 42%)"
            }
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? (
              <BiMoon fontSize={{ base: "14px", md: "20px" }} />
            ) : (
              <BiBulb fontSize={{ base: "14px", md: "20px" }} />
            )}
          </Button>
        </Box>

        <Box
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={"space-between"}
          p={{ base: " 5px 10px", md: "10px 20px" }}
          w={"100%"}
        >
          <Box
            display={{ base: "flex", md: "grid" }}
            alignItems={"center"}
            flexDirection={"column"}
            gridTemplateColumns={{ base: "100%", md: "repeat(3, 250px)" }}
            gap={4}
            w={{ base: "100%", md: "75%" }}
            mr={{ md: "20px" }}
          >
            {data.map((item) => (
              <Box
                key={item.name}
                padding={4}
                boxShadow="lg"
                borderRadius="lg"
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
                gap={{ base: "20px", md: "30px" }}
                w={"100%"}
                maxH={"450px"}
                overflow={"hidden"}
              >
                <Box position={"relative"}>
                  <Image
                    width={{ base: "350px", md: "auto" }}
                    src={item.image.mobile}
                    alt={item.name}
                    borderRadius={"15px"}
                    objectFit={"cover"}
                    border={
                      cart[item.name] > 0 && !isCartCleared
                        ? "3px solid hsl(14, 86%, 42%)"
                        : "none"
                    }
                  />
                  {cart[item.name] > 0 && !isCartCleared ? (
                    <Box
                      w={{ base: "150px", md: "120px" }}
                      p={"5px 10px"}
                      borderRadius={"30px"}
                      display={"flex"}
                      gap={"10px"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      position={"absolute"}
                      bottom={"-18px"}
                      left={{ base: "25%", md: "20%", lg: "23%" }}
                      color={"white"}
                      backgroundColor={"hsl(14, 86%, 42%)"}
                      size={{ base: "sm", md: "md" }}
                    >
                      <Box
                        w={"15px"}
                        h={"15px"}
                        border={"2px solid"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderRadius={"50%"}
                        _hover={{
                          backgroundColor: "white",
                          color: "hsl(14, 86%, 42%)",
                        }}
                      >
                        <BiMinus
                          cursor={"pointer"}
                          fontSize={{ base: "20px", md: "30px" }}
                          onClick={() => handleRemove(item.name)}
                        />
                      </Box>

                      {cart[item.name]}
                      <Box
                        w={"15px"}
                        h={"15px"}
                        border={"2px solid"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderRadius={"50%"}
                        _hover={{
                          backgroundColor: "white",
                          color: "hsl(14, 86%, 42%)",
                        }}
                      >
                        <BiPlus
                          cursor={"pointer"}
                          fontSize={{ base: "20px", md: "30px" }}
                          onClick={() => handleAdd(item.name)}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      w={{ base: "150px", md: "120px" }}
                      borderRadius={"30px"}
                      display={"flex"}
                      gap={"10px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      p={"5px 10px"}
                      boxShadow={"0px 0px 6px "}
                      position={"absolute"}
                      bottom={"-18px"}
                      left={{ base: "25%", md: "20%", lg: "23%" }}
                      color={"black"}
                      backgroundColor={"white"}
                      onClick={() => handleAddToCart(item.name)}
                      fontSize={{ base: "15px", md: "13px" }}
                      cursor={"pointer"}
                    >
                      <BiCartAdd
                        color="hsl(14, 86%, 42%)"
                        fontWeight={"bold"}
                        fontSize={{ base: "20px", md: "30px" }}
                      />
                      Add To Cart
                    </Box>
                  )}
                </Box>

                <Box w={"100%"} textAlign={"left"}>
                  <Text color="gray.400" marginBottom={2}>
                    {item.category}
                  </Text>
                  <Text fontSize="md" fontWeight="bold" marginBottom={2}>
                    {item.name}
                  </Text>
                  <Text
                    color="hsl(14, 86%, 42%)"
                    marginBottom={2}
                    fontWeight={"800"}
                    fontSize={"20px"}
                  >
                    ${item.price}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
          <YourCart
            cart={cart}
            setIsCartCleared={setIsCartCleared}
            setCart={setCart}
            items={data}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;

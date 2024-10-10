import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import EmptyIcon from "/assets/images/illustration-empty-cart.svg";
import Carbon from "/assets/images/icon-carbon-neutral.svg";
import Confirm from "/assets/images/icon-order-confirmed.svg";
import { BiTrash } from "react-icons/bi";

const YourCart = ({
  cart,
  setIsCartCleared,
  setCart,
  items,
  handleRemoveFromCart,
}) => {
  const addedItems = Object.keys(cart)
    .map((itemId) => {
      const item = items.find((i) => i.name === itemId);
      return {
        ...item,
        quantity: cart[itemId],
      };
    })
    .filter((item) => item.quantity > 0);

  const totalPrice = addedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirmOrder = () => {
    onOpen();
  };

  const handleResetCart = () => {
    setCart({});
    setIsCartCleared(false);
  };

  return (
    <>
      <Box
        h={"auto"}
        p={"20px"}
        w={"auto"}
        mb={{ base: "0px", md: "auto" }}
        mt={{ base: "30px", md: "0px" }}
        gap={"20px"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        boxShadow="lg"
        borderRadius="lg"
      >
        <Heading fontSize={'25px'}>Your Cart({addedItems.length})</Heading>
        {addedItems.length === 0 ? (
          <Box>
            <Image src={EmptyIcon} alt="Empty Cart" boxSize="200px" />
            <Text>Your added items will appear here</Text>
          </Box>
        ) : (
          <List spacing={4}>
            {addedItems.map((item) => (
              <ListItem
                key={item.name}
                display={"flex"}
                justifyContent={"space-between"}
                borderBottom={"2px solid grey"}
              >
                <Box display="flex" gap={"10px"} pb={"10px"}>
                  <Box display="flex" alignItems="center">
                    <Image
                      src={item.image.thumbnail}
                      w={"50px"}
                      mr={2}
                      borderRadius={"10px"}
                    />
                  </Box>
                  <Box display="flex" flexDirection={"column"}>
                    <Text fontSize="sm" fontWeight="bold">
                      {item.name} x{item.quantity}
                    </Text>

                    <Text
                      fontSize="14px"
                      fontWeight="bold"
                      color="hsl(14, 86%, 42%)"
                    >
                      ${item.price * item.quantity}
                    </Text>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  textAlign={"right"}
                  cursor={"pointer"}
                  colorScheme="red"
                  onClick={() => handleRemoveFromCart(item.name)}
                >
                  <BiTrash fontSize={"25px"} />
                </Box>
              </ListItem>
            ))}
            <ListItem>
              <Box display="flex" justifyContent="space-between">
                <Text fontSize="xl" fontWeight="bold">
                  Order Total:
                </Text>
                <Text
                  fontSize="25px"
                  fontWeight={"900"}
                  color="hsl(14, 86%, 42%)"
                >
                  ${totalPrice}
                </Text>
              </Box>
            </ListItem>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              gap={"10px"}
              background={"hsla(14, 24.50%, 72.00%, 0.72)"}
              p={"10px"}
              borderRadius={"10px"}
              fontSize={'12px'}
              color={"black"}
            >
              <Image src={Carbon} w={"30px"} />
              <Text>
                This order is a <b>carbon-neutral</b> delivery
              </Text>
            </Flex>
            <Button
              backgroundColor={"hsl(14, 86%, 42%)"}
              w={"100%"}
              p={"15px"}
              borderRadius={"30px"}
              fontSize={"18px"}
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </Button>
          </List>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={"20px"}>
          <Image src={Confirm} w={"60px"} ml={5} />
          <ModalHeader>Order Confirmed!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"xl"}>We hope you enjoy your food.</Text>
            <List spacing={4} mt={"20px"}>
              {addedItems.map((item) => (
                <ListItem key={item.name}>
                  <Box display="flex" gap={"20px"}>
                    <Image
                      src={item.image.thumbnail}
                      w={"60px"}
                      borderRadius={"10px"}
                    />
                    <Text fontSize="md" fontWeight="bold">
                      {item.name} x{item.quantity}
                    </Text>
                    <Text
                      fontSize="18px"
                      fontWeight="bold"
                      color="hsl(14, 86%, 42%)"
                    >
                      ${item.price * item.quantity}
                    </Text>
                  </Box>
                </ListItem>
              ))}
              <ListItem>
                <Box display="flex" justifyContent="space-between">
                  <Text fontSize="xl" fontWeight="600">
                    Order Total:
                  </Text>
                  <Text
                    fontSize="25px"
                    fontWeight={"900"}
                    color="hsl(14, 86%, 42%)"
                  >
                    ${totalPrice}
                  </Text>
                </Box>
              </ListItem>
            </List>
          </ModalBody>
          <ModalFooter>
            <Button
              fontSize={"18px"}
              fontWeight={"bold"}
              p={"25px"}
              borderRadius={"25px"}
              w={"100%"}
              backgroundColor={"hsl(14, 86%, 42%)"}
              onClick={() => {
                handleResetCart();
                onClose();
              }}
            >
              Start New Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default YourCart;

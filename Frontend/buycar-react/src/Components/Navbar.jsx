import { Box, Flex, IconButton, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import ButtonMain from "./ButtonMain";
import { useNavigate } from "react-router-dom";
import { FaMale } from "react-icons/fa";
const Navbar = () => {
  const nav = useNavigate();
  return (
    <>
      <SimpleGrid
        bg="white"
        p={2}
        zIndex={1}
        width={"100%"}
        pos="fixed"
        columns={3}
      >
        <Image
          borderRadius={5}
          width={"70px"}
          src="https://media.sketchfab.com/models/14098492e1ba4cd1a18c977a30689d4b/thumbnails/06095ddc24a04bbc967a8186019327ac/8bef94edf07b4bbbbc5b1bddfd8277c1.jpeg"
        />
        <SimpleGrid columns={[2]}>
          <Text onClick={() => nav("/adddeal")}>Deals</Text>
          <Text onClick={() => nav("/signup")}>Oem</Text>
        </SimpleGrid>

        <Flex justifyContent={"space-around"}>
          <IconButton>
            <FaMale />
          </IconButton>
          <ButtonMain onClick={() => nav("/login")} title={"Login"} />
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default Navbar;

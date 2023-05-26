import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ButtonMain from "./ButtonMain";
import { useNavigate } from "react-router-dom";
import { FaMale } from "react-icons/fa";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { auth, user } = useSelector((store) => store.auth);
  const nav = useNavigate();
  return (
    <>
      <SimpleGrid
        bg="white"
        p={2}
        zIndex={5}
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
          <Text onClick={() => nav("/addnewdeal")}>New Deal</Text>
          <Text onClick={() => nav("/deals")}>All Deals</Text>
        </SimpleGrid>

        <Flex justifyContent={"space-around"}>
          {!auth ? (
            <ButtonMain onClick={() => nav("/login")} title={"Login"} />
          ) : (
            <Avatar 
             size="md" name={user.name} />
          )}
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default Navbar;

import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ButtonMain from "./ButtonMain";
import { useNavigate } from "react-router-dom";
import { FaMale, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/authSlice";
import Cookies from "js-cookie";
import { SearchDrawer } from "./SearchDrawer";
const Navbar = () => {
  const { auth, user } = useSelector((store) => store.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState("deals");
  const [serachDrawerOpen, setSearchDrawerOpen] = useState(false);
  const handleLogout = () => {
    Cookies.remove("userTokenBuyCars");
    dispatch(logoutUser());
  };
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
         <SearchDrawer
         nav={true}
       sendSelected={(e)=>null}
        serachDrawerOpen={serachDrawerOpen}
        setSearchDrawerOpen={(e) => setSearchDrawerOpen(e)}
      />
        <Image
        onClick={()=>nav("/")}
          borderRadius={5}
          width={"70px"}
          src="https://media.sketchfab.com/models/14098492e1ba4cd1a18c977a30689d4b/thumbnails/06095ddc24a04bbc967a8186019327ac/8bef94edf07b4bbbbc5b1bddfd8277c1.jpeg"
        />
        <Flex justifyContent={"space-around"} alignItems={"center"}>
          
          <Text
            style={
              current === "addnewdeal"
                ? { backgroundColor: "green", color: "white" }
                : null
            }
            p={2}
            textAlign={"center"}
            borderRadius={5}
            _hover={{ bg: "green", color: "white" }}
            onClick={() => [nav("/addnewdeal"),setCurrent("addnewdeal")]}
          >
            New Deal
          </Text>
          <Text
            style={
              current === "deals"
                ? { backgroundColor: "green", color: "white" }
                : null
            }
            p={2}
            textAlign={"center"}
            borderRadius={5}
            _hover={{ bg: "green", color: "white" }}
            onClick={() =>[ nav("/deals"),setCurrent("deals")]}
          >
            All Deals
          </Text>
        </Flex>

        <Flex justifyContent={"space-evenly"}>
        <Button
              colorScheme="green"
              onClick={() => setSearchDrawerOpen(true)}
            >
              <FaSearch />
            </Button>
          {!auth ? (
            <ButtonMain onClick={() => nav("/login")} title={"Login"} />
          ) : (
            <>
              <Menu>
                <MenuButton as={"button"}>
                  <Avatar size="md" name={user.name} />
                </MenuButton>
                <MenuList>
                  <MenuItem >
                    <Text color="red" colorScheme="red" onClick={() => handleLogout()}>
                      Logout
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default Navbar;

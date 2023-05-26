import jwtDecode from "jwt-decode";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import ButtonMain from "../Components/ButtonMain";
import { Api_Link, cssStyles, succesAlert } from "../Components/Reusable";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/authSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initial = { name: "", email: "", password: "" };
  const [userData, setUserData] = useState(initial);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav=useNavigate()

  const getUserData = async (token) => {
    const decoded = jwtDecode(token);
    let { data } = await axios.get(`${Api_Link}/user/${decoded.id}`);
    dispatch(setUser(data.user));
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await axios.post(`${Api_Link}/register`, userData);
      console.log(data);

      setUserData(initial);
      succesAlert(data.msg);
      if (data.token) {
        Cookies.set("userTokenBuyCars", data.token);

        getUserData(data.token);
        setLoading(false);
        try {
        } catch (error) {}
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box
  
      width={["330px", "400px"]}
      m="auto"
      p={5}
      borderRadius={5}
      boxShadow={cssStyles.boxShadow1}
    >
      <Heading fontSize={cssStyles.medium} mb={3}>
        Signup Now
      </Heading>
      <form onSubmit={handleSignup} action="">
        <SimpleGrid gap={4} m="auto">
          <Input
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            type="text"
            placeholder="Enter Your Name"
          />
          <Input
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type="email"
            placeholder="Enter Your Email"
          />
          <InputGroup>
            <Input
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
            />
            <InputRightElement onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </InputRightElement>
          </InputGroup>
          <Text color="blue" fontWeight={500} textDecoration={"underline"} onClick={()=>nav("/login")}>Already Have an account ? Login Now</Text>
          <ButtonMain
            loading={loading}
            type={"submit"}
            width={"full"}
            title={"Signup Now"}
          />
        </SimpleGrid>
      </form>
    </Box>
  );
};

export default Signup;

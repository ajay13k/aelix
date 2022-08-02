import { useState } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    const api = "http://95.111.202.157:4001/api/login";
    let item = { username, password };
    axios
      .post(api, item)
      .then((response) => {
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        alert("Login Successfully");
        window.location = "/SidebarWithHeader";
      })
      .catch((err) => {
        console.log(err);
        alert("Email And Password or Incorrect");
      });
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input onChange={(e) => setEmail(e.target.value)} type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link
                style={{ textDecoration: "none" }}
                color={"blue.500"}
                to="changepassword"
              >
                Forgot Password?
              </Link>
            </Stack>
            <Button onClick={login} colorScheme={"blue"} variant={"solid"}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
export default LoginForm;

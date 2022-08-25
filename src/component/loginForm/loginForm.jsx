import { useState } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  FormHelperText,
  Text,
  Spacer,
  Container,
} from "@chakra-ui/react";
import { API } from "../../config/config";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(false);
  const [err, seterr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      seterror(true);
    }
    let item = { username, password };
    axios
      .post(`${API.login}`, item)
      .then((response) => {
        const token = response.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        alert("Login Successfully");
        window.location = "/dashboard";
      })
      .catch((err) => {
        if (username && password) {
          const err = "*username and password are not correct*";
          seterr(err);
        }
      });
  };

  return (
    <Container maxW={"7xl"}>
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <Heading fontSize={"2xl"}>Sign in to your account</Heading>
              <Heading color="#66b3ff" size={50}>
                Manager and Counsellor login
              </Heading>
              <span style={{ color: "red" }}>{err}</span>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input onChange={(e) => setUsername(e.target.value)} />
                {error && username.length <= 0 ? (
                  <FormHelperText color="red">
                    username is required
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                {error && password.length <= 0 ? (
                  <FormHelperText color="red">
                    password is required
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Spacer />
                  <Link style={{ textDecoration: "none" }} to="changepassword">
                    <Text color="blue.500">Forgot Password?</Text>
                  </Link>
                </Stack>
                <Button colorScheme={"blue"} variant={"solid"} type="submit">
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Flex>
      </Stack>
    </Container>
  );
}
export default LoginForm;
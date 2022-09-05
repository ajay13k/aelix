import { useState } from "react";
import axios from "axios";
import { API } from "./config/config";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  FormHelperText,
  HStack,
  Box,
  Text,
  Container,
} from "@chakra-ui/react";
import { FiUnlock } from "react-icons/fi";
import { NavLink } from "react-router-dom";
const token = localStorage.getItem("token");
function ForgotPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [error, seterror] = useState(false);
  const [pcerror, setpcerror] = useState("");

  const data = {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: conformPassword,
    id: "62ab250790fc21522ada7413",
  };
  console.log("change password", data);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      conformPassword.length === 0
    ) {
      seterror(true);
    } else if (newPassword !== conformPassword) {
      const pcerror = "New Password and Conform Password must be same";
      setpcerror(pcerror);
    } else {
      changePassword();
      alert("password change succsessfully");
    }
  };

  const changePassword = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios
      .post(`${API.changePassword}`, data, config)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container maxW="1200" w="85%" ml="15%">
        <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4} w={"full"} maxW={"md"}>
                <HStack>
                  <Text fontSize={25}>
                    <FiUnlock />
                  </Text>
                  <Heading fontSize={"2xl"}>change Password</Heading>
                </HStack>
                <FormControl>
                  <FormLabel>Old Password</FormLabel>
                  <Input
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  {error && oldPassword.length <= 0 ? (
                    <FormHelperText color="red">
                      old password is required
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    value={newPassword}
                  />
                  {error && newPassword.length <= 0 ? (
                    <FormHelperText color="red">
                      new password is required
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Conform Password</FormLabel>
                  <Input
                    value={conformPassword}
                    onChange={(e) => setConformPassword(e.target.value)}
                    type="password"
                  />
                  {error && conformPassword.length <= 0 ? (
                    <FormHelperText color="red">
                      conform password is required
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
                <Text color="red">{pcerror}</Text>
                <Stack spacing={6}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  ></Stack>
                  <HStack gap={10}>
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                      <Button w={200}>Cancel</Button>
                    </NavLink>
                    <Box>
                      <Button
                        w={200}
                        colorScheme="blue"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Update
                      </Button>
                    </Box>
                  </HStack>
                </Stack>
              </Stack>
            </form>
          </Flex>
        </Stack>
      </Container>
    </>
  );
}
export default ForgotPassword;

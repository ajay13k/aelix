import { useState } from "react";

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
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { FiUnlock } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Changepassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      seterror(true);
    }
  };

  return (
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
              ></Stack>
              <HStack gap={10}>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <Button w={200}>Cancel</Button>
                </NavLink>
                <Box>
                  <Button w={200} colorScheme="blue" type="submit">
                    Update
                  </Button>
                </Box>
              </HStack>
            </Stack>
          </Stack>
        </form>
      </Flex>
    </Stack>
  );
}
export default Changepassword;

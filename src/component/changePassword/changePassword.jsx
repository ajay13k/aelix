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
  Container,
} from "@chakra-ui/react";
import { FiUnlock } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import SidebarWithHeader from "../sidebarwithheader/SidebarWithHeader";

function Changepassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ConformPassword, setConformPassword] = useState("");
  const [error, seterror] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      ConformPassword.length
    ) {
      seterror(true);
    } else {
      alert("Password Change Successfully");
    }
  };

  return (
    <>
      <SidebarWithHeader />
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
                  <Input onChange={(e) => setOldPassword(e.target.value)} />
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
                    onChange={(e) => setConformPassword(e.target.value)}
                    type="password"
                  />
                  {error && ConformPassword.length <= 0 ? (
                    <FormHelperText color="red">
                      conform password is required
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
                    <NavLink
                      to="/dashboard"
                      style={{ textDecoration: "none" }}
                    >
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
      </Container>
    </>
  );
}
export default Changepassword;

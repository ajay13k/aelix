import React, { useState } from "react";
import axios from "axios";
import { API } from "../../config/config";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Select,
  FormHelperText,
} from "@chakra-ui/react";
import SidebarWithHeader from "../sidebarwithheader/SidebarWithHeader";
import { NavLink } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
function AddCounsellor() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [assign, setAssign] = useState("626272fe5f0f8244e6759fd8");
  const [error, seterror] = useState(false);
  const data = {
    role: "counsellor",
    name: name,
    phone: mobile,
    username: username,
    password: password,
    lastname: lastName,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      lastName === "" ||
      mobile === "" ||
      password === "" ||
      username === ""
      // assign.length === 0
    ) {
      seterror(true);
    } else {
      addCounsellor();
      alert("add counsellor successfully");
      window.location = "/counsellor";
    }
  };
  const token = localStorage.getItem("token");

  const addCounsellor = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .post(`${API.addCounsellor}`, data, config)
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
      <SidebarWithHeader />
      <Flex align={"center"} justify={"center"} maxW="1200" w="85%" ml="13%">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack>
            <Box width="800px" p={5}>
              <HStack mb={30}>
                <FaUserGraduate />
                <Heading size="sm" mb={15}>
                  Add Counsellor
                </Heading>
              </HStack>
              <Stack spacing={4}>
                <HStack>
                  <Box mr={20}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        width="400px"
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        value={name}
                      />
                      {error && name.length <= 0 ? (
                        <FormHelperText color="red">
                          Name is required
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="address">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        width="400px"
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        placeholder=" Last Name"
                        value={lastName}
                      />
                      {error && lastName.length <= 0 ? (
                        <FormHelperText color="red">
                          Last Name is required
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Box>
                </HStack>
                <HStack>
                  <Box>
                    <FormControl>
                      <FormLabel>Mobile No</FormLabel>
                      <Input
                        width="400px"
                        onChange={(e) => setMobile(e.target.value)}
                        type="text"
                        placeholder="mobile"
                        value={mobile}
                      />
                      {error && mobile.length <= 0 ? (
                        <FormHelperText color="red">
                          Mobile No is required
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Box>
                  <Box paddingLeft="80px">
                    <FormControl>
                      <FormLabel>Class</FormLabel>
                      <Select
                        width="400px"
                        onChange={(e) => setAssign(e.target.value)}
                        placeholder="class"
                      >
                        <option value={assign}>Class A</option>
                        <option value={assign}>Class B</option>
                        <option value={assign}>Class C</option>
                      </Select>
                      {error && assign.length <= 0 ? (
                        <FormHelperText color="red">
                          class is required
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Box>
                </HStack>
                <Box paddingTop="20px">
                  <HStack>
                    <Box paddingRight="80px">
                      <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                          width="400px"
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                          value={password}
                        />
                        {error && password.length <= 0 ? (
                          <FormHelperText color="red">
                            password is required
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                          width="400px"
                          value={username}
                          onChange={(e) => setUserName(e.target.value)}
                          type="text"
                          placeholder=" username"
                        />
                        {error && username.length <= 0 ? (
                          <FormHelperText color="red">
                            username is required
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </Box>
                  </HStack>
                </Box>
              </Stack>
            </Box>
            <HStack gap={30} pt="50px" pl={5}>
              <NavLink to="/counsellor" style={{ textDecoration: "none" }}>
                <Button w={200}>Cancel</Button>
              </NavLink>
              <Box paddingLeft={39}>
                <Button
                  w={200}
                  colorScheme="blue"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Box>
            </HStack>
          </Stack>
        </form>
      </Flex>
    </>
  );
}
export default AddCounsellor;

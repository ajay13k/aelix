import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../config/config";
import { useParams } from "react-router-dom";
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
function EditCounsellor() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [assign, setAssign] = useState("626272fe5f0f8244e6759fd8");
  const [error, seterror] = useState(false);
  const [consellor, setCousellor] = useState("");
  const data = {
    name: name,
    phone: mobile,
    username: username,
    password: password,
    lastname: lastName,
    classId: "626273065f0f8244e6759fda",
  };
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.length === "" ||
      lastName.length === "" ||
      mobile.length === "" ||
      password.length === "" ||
      username.length === "" ||
      assign.length === 0
    ) {
      seterror(true);
    } else {
      alert("update successfully")
      handleUpdate();
    }
  };
  const getUser = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get(`${API.getUser}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCousellor(res.data.data);
        setName(res.data.data[0].name);
        setLastName(res.data.data[0].lastname);
        setMobile(res.data.data[0].phone);
        setUserName(res.data.data[0].username);
        setPassword(res.data.data[0].password);
        setAssign(res.data.data[0].classId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .put(`${API.updateUser}/${id}`, data, config)
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
  useEffect(() => {
    handleUpdate();
  }, []);
  return (
    <>
      <SidebarWithHeader />
      <Flex align={"center"} justify={"center"} maxW="1200" w="85%" ml="13%">
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* {consellor.map(() => {
                  return <>
                  </>;
                })} */}
          <Stack>
            <Box width="800px" p={5}>
              <HStack mb={30}>
                <FaUserGraduate />
                <Heading size="sm" mb={15}>
                  Edit Counsellor
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
                        Value={name}
                        name={name}
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
                        Value={lastName}
                        name={lastName}
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
                        Value={mobile}
                        name={mobile}
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
                        name={assign}
                      >
                        <option Value={assign}>Class A</option>
                        <option Value={assign}>Class B</option>
                        <option Value={assign}>Class C</option>
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
                          Value={password}
                          name={password}
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
                          Value={username}
                          onChange={(e) => setUserName(e.target.value)}
                          type="text"
                          placeholder=" username"
                          name={username}
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
                  Update Counsellor
                </Button>
              </Box>
            </HStack>
          </Stack>
        </form>
      </Flex>
    </>
  );
}
export default EditCounsellor;

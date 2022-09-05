import React, { useState, useEffect } from "react";
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
  Container,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import SidebarWithHeader from "../sidebarwithheader/SidebarWithHeader";
function AddStudent() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [assign, setAssign] = useState("");
  const [error, seterror] = useState(false);
  const [getclass, setGetclass] = useState([]);
  const token = localStorage.getItem("token");

  const data = {
    name: name,
    lastName: lastName,
    fatherName: fatherName,
    DOB: dob,
    address: address,
    assignClass: assign,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.length === 0 ||
      lastName.length === 0 ||
      fatherName.length === 0 ||
      dob.length === 0 ||
      address.length === 0
      // assign.length === 0
    ) {
      seterror(true);
    } else {
      creatStudent();
      alert("Add Student Succsessfully");
      window.location = "/students";
    }
  };

  const creatStudent = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios
      .post(`${API.addStudent}`, data, config)
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

  const classdata = async () => {
    const response = await axios.get(`${API.getClass}`);
    setGetclass(response.data.data);
  };
  useEffect(() => {
    classdata();
  }, []);
  return (
    <>
      {console.log(getclass)}
      <SidebarWithHeader />
      <Container maxW="1200" w="85%" ml="11%" pt="100px">
        <Flex align={"center"} justify={"center"}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack>
              <Box width="800px" p={5}>
                <HStack mb={30}>
                  <FaUserGraduate />
                  <Heading size="sm" mb={15}>
                    Add Student
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
                    <Box w={240}>
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
                        <FormLabel>Father Name</FormLabel>
                        <Input
                          width="400px"
                          onChange={(e) => setFatherName(e.target.value)}
                          type="text"
                          placeholder="Father Name"
                          value={fatherName}
                        />
                        {error && fatherName.length <= 0 ? (
                          <FormHelperText color="red">
                            Father Name is required
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </Box>
                    <Box paddingLeft="80px">
                      <FormControl>
                        <FormLabel>Date Of Birth</FormLabel>
                        <Input
                          width="400px"
                          onChange={(e) => setDob(e.target.value)}
                          type="date"
                          placeholder="Name"
                          value={dob}
                        />
                        {error && dob.length <= 0 ? (
                          <FormHelperText color="red">
                            DOB is required
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
                          <FormLabel>Class</FormLabel>
                          <Select
                            width="400px"
                            onChange={(e) => setAssign(e.target.value)}
                            placeholder="class"
                          >
                            {getclass.map((item) => {
                              return (
                                <option key={item._id} value={item._id}>
                                  {item.className}
                                </option>
                              );
                            })}
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
                      <Box>
                        <FormControl>
                          <FormLabel>Address</FormLabel>
                          <Input
                            width="400px"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            placeholder=" address"
                          />
                          {error && address.length <= 0 ? (
                            <FormHelperText color="red">
                              address is required
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
              <HStack pl="15px">
                <NavLink to="students" style={{ textDecoration: "none" }}>
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
      </Container>
    </>
  );
}
export default AddStudent;

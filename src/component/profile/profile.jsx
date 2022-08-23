import axios from "axios";
import React, { useState, useEffect } from "react";
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
  Text,
  VStack,
  Avatar,
  Select,
  FormHelperText,
  Container,
  Spacer,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import SidebarWithHeader from "../sidebarwithheader/SidebarWithHeader";
function Profile() {
  const [profile, setProfile] = useState("");
  const [countryId, setCountryId] = useState("");
  const [address, setAddress] = useState("");
  const [stateId, setStateId] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, seterror] = useState(false);
  const [mobileError, setMobileError] = useState("");
  console.log("anay", mobileError);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email.length === 0 ||
      mobile.length === 0 ||
      address.length === 0 ||
      // city.length === 0 ||
      stateId.length === 0 ||
      countryId.length === 0
    ) {
      seterror(true);
    } else {
      alert("Submit Form Successfully");
    }
    const pattern = "/^(+d{1,3}[- ]?)?d{10}$/";
    if (!pattern.match(mobile)) {
      setMobileError("invalid number");
    } else {
    }
  };
  useEffect(() => {
    const loadPost = async () => {
      const response = await axios.get(`${API.getAllCountry}`);
      setProfile(response.data.country);
    };
    loadPost();
  }, []);
  useEffect(() => {
    const getState = async () => {
      const response = await axios.get(
        `http://95.111.202.157:4001/api//state/${countryId}`
      );
      setState(response.data);
    };
    getState();
  });

  return (
    <>
      <SidebarWithHeader />
      <Container maxW="100%" w="85%" pt="100px">
        <Flex align={"center"} justify={"center"} ml="200px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack>
              <HStack>
                <Avatar size={"sm"} src={"https://bit.ly/sage-adebayo"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Jhany Bravo</Text>
                  <Text fontSize="xs" color="gray.600">
                    Manager
                  </Text>
                </VStack>
              </HStack>
              <Box p={5}>
                <Heading size="sm" mb={10}>
                  My Address
                </Heading>
                <Stack spacing={4}>
                  <HStack>
                    <Box mr={20}>
                      <FormControl id="address">
                        <FormLabel>Street Address</FormLabel>
                        <Input
                          w={400}
                          onChange={(e) => setAddress(e.target.value)}
                          type="text"
                          placeholder="street number"
                          value={address}
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
                    <Box w={240}>
                      <FormControl id="state">
                        <FormLabel>State</FormLabel>
                        <Select
                          onChange={(e) => setStateId(e.target.value)}
                          w={400}
                        >
                          <option>select state</option>
                          {state &&
                            state.map((item) => {
                              return (
                                <>
                                  <option value={item._id}>{item.name}</option>
                                </>
                              );
                            })}
                        </Select>
                        {error && address.length <= 0 ? (
                          <FormHelperText color="red">
                            state is required
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
                        <FormLabel>Country</FormLabel>
                        <Select
                          onChange={(e) => setCountryId(e.target.value)}
                          w={400}
                        >
                          <option>select country</option>
                          {profile &&
                            profile.map((item) => {
                              return (
                                <>
                                  <option value={item._id}>{item.name}</option>
                                </>
                              );
                            })}
                        </Select>
                        {error && countryId.length <= 0 ? (
                          <FormHelperText color="red">
                            country is required
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </Box>
                    <Box paddingLeft="80px">
                      <FormControl id="country">
                        <FormLabel>City</FormLabel>
                        <Select
                          w={400}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Country"
                        >
                          <option value={city}>indore</option>
                        </Select>
                        {error && city.length <= 0 ? (
                          <FormHelperText color="red">
                            city is required
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </Box>
                  </HStack>
                  <Box paddingTop="20px">
                    <Heading size="sm" mb={10}>
                      Contact Details
                    </Heading>
                    <HStack>
                      <Box mr={20}>
                        <FormControl id="email">
                          <FormLabel>Email Address</FormLabel>
                          <Input
                            w={400}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="email address"
                          />
                          {error && email.length <= 0 ? (
                            <FormHelperText color="red">
                              email is required
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="number">
                          <FormLabel>Mobile Number</FormLabel>
                          <Input
                            w={400}
                            value={mobile}
                            
                            onChange={(e) => setMobile(e.target.value)}
                            type="text"
                            placeholder=" mobile number"
                          />
                          {error && mobile.length <= 0 ? (
                            <FormHelperText color="red">
                              mobile number is required
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
              <HStack gap={38}>
                <NavLink
                  to="/sidebarwithheader"
                  style={{ textDecoration: "none" }}
                >
                  <Button w={200}>Cancel</Button>
                </NavLink>
                <Box paddingLeft={39}>
                  <Button w={200} colorScheme="blue" type="submit">
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
export default Profile;

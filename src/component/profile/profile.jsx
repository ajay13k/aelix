import axios from "axios";
import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email.length === 0 ||
      mobile.length === 0 ||
      address.length === 0 ||
      city.length === 0 ||
      stateId.length === 0 ||
      countryId.length === 0
    ) {
      seterror(true);
    }
  };
  useEffect(() => {
    const api = "http://95.111.202.157:4001/api/getAllCountry";
    const loadPost = async () => {
      const response = await axios.get(api);
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
      <HStack fontWeight="bold">
        <AiOutlineArrowLeft />
        <Link style={{ textDecoration: "none" }} to="SidebarWithHeader">
          Go Back
        </Link>
      </HStack>
      <Flex align={"center"} justify={"center"}>
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
            <Box width="800px" p={5}>
              <Heading size="sm" mb={10}>
                My Address
              </Heading>
              <Stack spacing={4}>
                <HStack>
                  <Box mr={20}>
                    <FormControl id="address">
                      <FormLabel>Street Address</FormLabel>
                      <Input
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
                      <Select onChange={(e) => setStateId(e.target.value)}>
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
                  <Box w={240}>
                    <FormControl>
                      <FormLabel>Country</FormLabel>
                      <Select onChange={(e) => setCountryId(e.target.value)}>
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
                  <Box Box w={320} paddingLeft="80px">
                    <FormControl id="country">
                      <FormLabel>City</FormLabel>
                      <Select
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
            <HStack gap={36}>
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
    </>
  );
}
export default Profile;

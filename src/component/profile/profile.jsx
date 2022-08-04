import axios from "axios";
import { useState } from "react";
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
  useColorModeValue,
  VStack,
  Avatar,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
function Profile() {
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const login = async () => {
    let item = { address, state, country, email, city, mobile };
    const api = console.log(item);
    const { data: post } = await axios.post(api, item);
    console.log(post);
  };

  return (
    <>
      <HStack fontWeight="bold">
        <AiOutlineArrowLeft />
        <Link style={{ textDecoration: "none" }} to="SidebarWithHeader">
          Go Back
        </Link>
      </HStack>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8}>
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
                  <FormControl id="address" isRequired>
                    <FormLabel>Street Address</FormLabel>
                    <Input
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      placeholder="street number"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="state">
                    <FormLabel>State</FormLabel>
                    <Select
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                    >
                      <option value="option1">mp</option>
                    </Select>
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box mr={20}>
                  <FormControl id="city" isRequired>
                    <FormLabel>City</FormLabel>
                    <Select
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                    >
                      <option value={city}>khandwa</option>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="country">
                    <FormLabel>Country</FormLabel>
                    <Select
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Country"
                    >
                      <option value="option1">india</option>
                    </Select>
                  </FormControl>
                </Box>
              </HStack>
              <Box paddingTop="20px">
                <Heading size="sm" mb={10}>
                  Contact Details
                </Heading>
                <HStack>
                  <Box mr={20}>
                    <FormControl id="email" isRequired>
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="email address"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="number">
                      <FormLabel>Mobile Number</FormLabel>
                      <Input
                        onChange={(e) => setMobile(e.target.value)}
                        type="text"
                        placeholder=" mobile number"
                      />
                    </FormControl>
                  </Box>
                </HStack>
              </Box>
            </Stack>
          </Box>
          <HStack gap={20}>
            <Button w={200}  >Cancel</Button>
            <Button w={200} colorScheme="blue">
              Save
            </Button>
          </HStack>
        </Stack>
      </Flex>
    </>
  );
}
export default Profile;

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Grid,
  GridItem,
  HStack,
  Spacer,
  Select,
  FormLabel,
  Container,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDashboard } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { API } from "../../config/config";
export default function Dashboard() {
  const [getClass, setClass] = useState("");
  const [getStudent, setStudent] = useState("");
  useEffect(() => {
    const student = async () => {
      const response = await axios.get(`${API.getStudent}`);
      setStudent(response.data.data);
    };
    student();
  }, []);
  useEffect(() => {
    const getClass = async () => {
      const response = await axios.get(`${API.getClass}`);
      setClass(response.data.data);
    };
    getClass();
  }, []);
  return (
    <>
      <HStack p={5} fontWeight="bold">
        <AiOutlineArrowLeft />
        <Link style={{ textDecoration: "none" }} to="SidebarWithHeader">
          Go Back
        </Link>
      </HStack>
      <Container maxW={"1200"} mx="auto">
        <HStack>
          <Text fontSize={30}>
            <MdDashboard />
          </Text>
          <Text fontSize={30} fontWeight={700}>
            Class Dashboard
          </Text>
          <Spacer />

          <HStack>
            <Text>Filter BY</Text>
            <Select>
              {getClass &&
                getClass.map((item) => {
                  return (
                    <option value={item._id} key={item._id}>
                      {item.className}
                    </option>
                  );
                })}
            </Select>
            ;
          </HStack>
        </HStack>
        <HStack mt={5}>
          <Text color="blue" fontWeight={700}>
            Class A
          </Text>
          <Spacer />
          <Text color="#1a8cff">
            <Link style={{ textDecoration: "none" }} to="studentAttendace">
              Attedance Report
            </Link>
          </Text>
        </HStack>
        <Grid templateColumns="repeat(4, 1fr)" mt={30}>
          <GridItem>
            <Box
              maxW={"270px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Box>
                <Stack align={"center"}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    Total Student
                  </Heading>
                </Stack>
                <Stack justify={"center"}>
                  <Stack align={"center"}>
                    <Text fontSize={50} color="blue" fontWeight={600}>
                      25
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              maxW={"270px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Box>
                <Stack align={"center"}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    Present Student
                  </Heading>
                </Stack>
                <Stack justify={"center"}>
                  <Stack align={"center"}>
                    <Text fontSize={50} color="blue" fontWeight={600}>
                      24
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              maxW={"270px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Box>
                <Stack align={"center"}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    Absent Student
                  </Heading>
                </Stack>
                <Stack justify={"center"}>
                  <Stack align={"center"}>
                    <Text fontSize={50} color="blue" fontWeight={600}>
                      1
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              maxW={"270px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Box>
                <Stack align={"center"}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    Out Of Class
                  </Heading>
                </Stack>
                <Stack justify={"center"}>
                  <Stack align={"center"}>
                    <Text fontSize={50} color="blue" fontWeight={600}>
                      4
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </GridItem>
        </Grid>
        <Flex mt={100}>
          <Box p="4" w={760} border="1px solid black" boxShadow={"2xl"}>
            <Heading size={50}>Absent</Heading>
            <HStack spacing={6} mt="5">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Text fontSize={"sm"}>Ajay Kushwah</Text>
            </HStack>
          </Box>
          <Spacer />
          <Box p="4" w={400} border="1px solid black" boxShadow={"2xl"}>
            <Heading size={50}>Student Out Of Class</Heading>
            <HStack spacing={6} mt="5">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Text fontSize={"sm"}>Ajay Kushwah</Text>
            </HStack>
            <HStack spacing={6} mt="2">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Text fontSize={"sm"}>Ajay Kushwah</Text>
            </HStack>
            <HStack spacing={6} mt="2">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Text fontSize={"sm"}>Ajay Kushwah</Text>
            </HStack>
            <HStack spacing={6} mt="2">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Text fontSize={"sm"}>Ajay Kushwah</Text>
            </HStack>
          </Box>
        </Flex>
      </Container>
    </>
  );
}

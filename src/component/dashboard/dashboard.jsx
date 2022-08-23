import {
  Heading,
  Avatar,
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Grid,
  GridItem,
  HStack,
  Spacer,
  Select,
  Container,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDashboard } from "react-icons/md";
import { API, BASE_URL } from "../../config/config";
import SidebarWithHeader from "../sidebarwithheader/SidebarWithHeader";
export default function Dashboard() {
  const [classData, setClassData] = useState([]);
  const [rows, setStudentDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterr, setFilter] = useState([]);
  const [classNameOnChange, setclassNameOnChange] = useState("");
  const [classNameIdOnChange, setclassNameIdOnChange] = useState("");

  useEffect(() => {
    GetStudentData();
    GetClassData();
  }, []);
  console.log("govind", rows);

  const GetStudentData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios
      .get(`${API.getStudent}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {});
    if (response.status === 200) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    setStudentDetail(response.data);
    setFilter(response.data.data);
  };

  const GetClassData = async () => {
    const response = await axios.get(`${API.getClass}`).catch((err) => {});
    if (response.status === 200) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    setClassData(response.data.data);
  };

  const SelectOnChange = (ele) => {
    const classNameGet = classData.find((item) => {
      return item && item._id === ele ? item.className : "";
    });
    setclassNameOnChange(classNameGet && classNameGet.className);
    setclassNameIdOnChange(ele);

    if (ele === "all") {
      setFilter(rows.data);
    } else if (ele === ele) {
      const data = rows.data.filter((item) => {
        return item.assignClass ? item.assignClass._id === ele : "";
      });
      if (data.length > 0) {
        setFilter(data);
      } else {
        setFilter([]);
      }
    }
  };
  const filterDataAbs =
    filterr.length === 0
      ? []
      : filterr.filter((vall) =>
          vall && vall.attaindence && vall.attaindence !== null
            ? []
            : vall.attaindence && vall.attaindence.attendence.includes("0")
        );
  const filterDataPre =
    filterr.length === 0
      ? []
      : filterr.filter((vall) =>
          vall && vall.attaindence && vall.attaindence !== null
            ? []
            : vall.attaindence && vall.attaindence.attendence.includes("1")
        );
  const filteroutofClass =
    filterr.length === 0
      ? []
      : filterr.filter((vall) =>
          vall && vall.attaindence && vall.attaindence !== null
            ? []
            : vall.attaindence && vall.attaindence.out_of_class
        );

  return (
    <>
      <SidebarWithHeader />
      <Container maxW="100%" w="85%" ml="15%" pt="100px">
        <HStack fontWeight="bold" fontSize="20px">
          <MdDashboard />
          <Text>Class Dashboard</Text>
        </HStack>

        <HStack pl="800px">
          <Text>Filter By:</Text>
          <Select
            w={40}
            defaultValue={"all"}
            onChange={(e) => SelectOnChange(e.target.value)}
          >
            <option value="all">all</option>
            {classData &&
              classData.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.className}
                  </option>
                );
              })}
          </Select>
        </HStack>
        <Grid templateColumns="repeat(4, 1fr)" mt={30} gap={4}>
          <GridItem>
            <Box
              maxW={"270px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
              className="zoom"
            >
              <Box>
                <Stack align={"center"}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight="bold"
                    fontFamily={"body"}
                  >
                    Total Student
                  </Heading>
                </Stack>
                <Stack justify={"center"}>
                  <Stack align={"center"}>
                    <Text fontSize={50} color="blue" fontWeight={600}>
                      {filterr.length === 0
                        ? 0
                        : classNameOnChange === "all"
                        ? rows.totalcount
                        : filterr.length}
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
              className="zoom"
            >
              <Box>
                <Stack align={"center"}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight="bold"
                    fontFamily={"body"}
                  >
                    Present
                  </Heading>
                </Stack>
                <Stack justify={"center"}>
                  <Stack align={"center"}>
                    <Text fontSize={50} color="blue" fontWeight={600}>
                      {filterDataPre.length === 0
                        ? 0
                        : classNameOnChange === "all"
                        ? rows.totalpresent
                        : filterDataPre.length}
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
              className="zoom"
            >
              <Box>
                <Stack align={"center"}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight="bold"
                    fontFamily={"body"}
                  >
                    Absent
                  </Heading>
                </Stack>
                <Stack justify={"center"}>
                  <Stack align={"center"}>
                    <Text fontSize={50} color="blue" fontWeight={600}>
                      {filterDataAbs.length === 0
                        ? 0
                        : classNameOnChange === "all"
                        ? rows.totalabsent
                        : filterDataAbs.length}
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
              className="zoom"
            >
              <Box>
                <Stack align={"center"}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight="bold"
                    fontFamily={"body"}
                  >
                    Out Of Class
                  </Heading>
                </Stack>
                <Stack justify={"center"}>
                  <Stack align={"center"}>
                    <Text fontSize={50} color="blue" fontWeight={600}>
                      {filteroutofClass.length === 0
                        ? 0
                        : classNameOnChange === "all"
                        ? rows.totalout
                        : filteroutofClass.length}
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </GridItem>
        </Grid>
        <Flex mt={35}>
          <Box
            p="4"
            w={760}
            border="1px solid black"
            boxShadow={"2xl"}
            ml="10px"
          >
            <Heading size={50}>Absent</Heading>
            {filterDataAbs.length === 0 ? (
              <Text>No records found</Text>
            ) : (
              filterDataAbs.length &&
              filterDataAbs.map((item) => {
                return (
                  <>
                    <HStack spacing={6} mt="5">
                      <Avatar
                        name="Dan Abrahmov"
                        src={`${BASE_URL}/${item.image}`}
                      />

                      <Text fontSize={"sm"}>{item.name}</Text>
                      <Text fontSize={"sm"}>{item.assignClass.className}</Text>
                    </HStack>
                  </>
                );
              })
            )}
          </Box>
          <Box
            p="4"
            w={390}
            border="1px solid black"
            boxShadow={"2xl"}
            ml="10px"
          >
            <Heading size={50}>Student Out Of Class</Heading>
            {filteroutofClass.length === 0 ? (
              <Text>No records found</Text>
            ) : (
              filteroutofClass.length &&
              filteroutofClass.map((item) => {
                return (
                  <>
                    <HStack spacing={6} mt="5">
                      <Avatar
                        name="Dan Abrahmov"
                        src={`${BASE_URL}/${item.image}`}
                      />

                      <Text fontSize={"sm"}>{item.name}</Text>
                      <Text>{item.attaindence.out_of_class}</Text>
                    </HStack>
                  </>
                );
              })
            )}
          </Box>
        </Flex>
      </Container>
    </>
  );
}

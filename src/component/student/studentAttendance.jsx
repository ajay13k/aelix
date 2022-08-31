import SidebarWithHeader from "../sidebarwithheader/SidebarWithHeader";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  HStack,
  Spacer,
  Text,
  Avatar,
  Box,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { API, BASE_URL } from "../../config/config";
import axios from "axios";
const token = localStorage.getItem("token");
const StudentAttendace = () => {
  const [student, setStudent] = useState([]);
  const studentData = async () => {
    const response = await axios.get(`${API.getStudent}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudent(response.data.data);
  };
  useEffect(() => {
    studentData();
  }, []);
  const onButtonClick = () => {
    fetch("SamplePDF.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "SamplePDF.pdf";
        alink.click();
      });
    });
  };
  return (
    <>
      <SidebarWithHeader />
      <Box w="85%" maxW="100%" ml="15%" pt={20}>
        <HStack mt={5} mb="40px">
          <Heading pl={5}>Attendance Report</Heading>
          <Spacer />
          <Text float="right" pr={8}>
            Week Month
          </Text>
          <Button onClick={onButtonClick}>Download pdf</Button>
        </HStack>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Student</Th>
                <Th>Apr11</Th>
                <Th>Apr11</Th>
                <Th>Apr11</Th>
                <Th>Apr11</Th>
                <Th>Apr11</Th>
                <Th>Apr11</Th>
                <Th>Apr11</Th>
              </Tr>
            </Thead>
            <Tbody>
              {student &&
                student.map((item) => {
                  return (
                    <>
                      <Tr>
                        <Td>
                          {" "}
                          <Avatar
                            size={20}
                            mr="3"
                            name="Dan Abrahmov"
                            src={`${BASE_URL}/${item.image}`}
                          />
                          {item.name}
                        </Td>
                        <Td>p</Td>
                        <Td>p</Td>
                        <Td>p</Td>
                        <Td>p</Td>
                        <Td>p</Td>
                        <Td>Leave</Td>
                        <Td>Leave</Td>
                      </Tr>
                    </>
                  );
                })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Total</Th>
                <Td>4</Td>
                <Td>4</Td>
                <Td>4</Td>
                <Td>4</Td>
                <Td>4</Td>
                <Td>0</Td>
                <Td>0</Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default StudentAttendace;

import {
  Input,
  Select,
  GridItem,
  Grid,
  Text,
  HStack,
  Heading,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
function StudentTable() {
  const [student, setStudent] = useState([]);
  const [title, setTitle] = useState("");
  const [option, setOption] = useState("");
  const api = "http://95.111.202.157:4001/api/student";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmMyZDdlMjU1Mjk0NzZjZmM1Yjk5NDciLCJpYXQiOjE2NTk0MTkxNzAsImV4cCI6MTY1OTUwNTU3MH0.ipy-alwjelPQ8S_T67dWC3v3hInava8pT5Maiud65ow";
  const loadPost = async () => {
    const response = await axios.get(api, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudent(response.data.data);
  };
  useEffect(() => {
    loadPost();
  }, []);
  const onDelete = async (studentData) => {
    const api = "http://95.111.202.157:4001/api/deleteStudent";
    await axios.delete(api + "/" + studentData._id);
    const student_data = student.filter((e) => e._id !== studentData._id);
    setStudent({ student_data });
  };
  return (
    <>
      <HStack m="5">
        <Text fontSize={30}>
          <FaUserGraduate />
        </Text>
        <Heading>Students</Heading>
      </HStack>
      <Grid templateColumns="repeat(2, 1fr)" gap={80}>
        <GridItem w="50%" h="10" m={30}>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            size="md"
            placeholder="search students"
          />
        </GridItem>
        <GridItem w="40%" h="10" m={30}>
          <HStack>
            <Text>Filter </Text>
            <Select
              placeholder="Select option"
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="option1">Class A</option>
              <option value="option2">Class B</option>
              <option value="option3">Class C</option>
            </Select>
          </HStack>
        </GridItem>
      </Grid>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Medical</th>
            <th>Emergency</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {student
            .filter((item) => {
              if (title === "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(title.toLowerCase())
              ) {
                return item;
              }
            })
            .map((studentData) => (
              <tr key={studentData._id}>
                <td>{studentData.name}</td>
                <td>{studentData.assignClass.className}</td>
                <td></td>
                <td></td>
                <td>
                  <button
                    onClick={() => onDelete(studentData)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button className="btn btn-primary">edit</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default StudentTable;
